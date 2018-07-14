import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import CommodityList from '../../components/CommodityList';
import { scale } from '../../utils/dimension';
import request from '../../utils/request'
import UserStore from '../../utils/user'
import Toast from 'react-native-root-toast';

export default class extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.shopName,
        headerRight: <View />,
    })
    state = {
        shopId: null,
        detail: {
            shopinfo: {},
            commoditys: []
        }
    }
    componentDidMount() {
        const shopId = this.props.navigation.getParam('shopId')
        this.setState({
            shopId,
        }, () => {
            this.fetchShop()
        })
    }
    async addShopFavor(id) {
        var user = UserStore.user
        if (!user) {
            this.props.navigation.navigate('UserLogin')
            return
        }
        var res = await request("https://www.bjzntq.com:8888/ShopMall/Collect_Shop/", {
            "tokeninfo": user.tokeninfo,
            "shop_id": id
        })
        Toast.show(res.message, {
            position: Toast.positions.CENTER
        })
        this.setState({
            detail: {
                ...this.state.detail,
                is_collect: true
            }
        })
    }
    async removeShopFavor(id) {
        var user = UserStore.user
        if (!user) {
            this.props.navigation.navigate('UserLogin')
            return
        }
        var res = await request("https://www.bjzntq.com:8888/ShopMall/cancelCollectShop/", {
            "tokeninfo": user.tokeninfo,
            "shop_id": id
        })
        Toast.show(res.message, {
            position: Toast.positions.CENTER
        })
        this.setState({
            detail: {
                ...this.state.detail,
                is_collect: false
            }
        })
    }
    async fetchShop() {
        var res = await request("https://www.bjzntq.com:8888/ShopMall/GetShopInfo/", {
            "tokeninfo": UserStore.user.tokeninfo,
            "shop_id": this.state.shopId
        })
        this.setState({ detail: res.data || {} })
    }
    render() {
        const { detail } = this.state
        return (
            <View style={{ backgroundColor: '#f1f1f1' }}>
                <View style={{ flexDirection: "row", height: scale(43), marginBottom: 1, backgroundColor: "#fff", alignItems: "center", paddingHorizontal: scale(15) }}>
                    <Image source={require("../../images/shop_icon.png")} />
                    <Text style={{ color: "#6A617A", fontSize: scale(12), flex: 1, marginLeft: scale(10) }}>全部商品：{detail.commoditys_num}</Text>
                    {detail.is_collect ? (
                        <Touchable onPress={() => this.removeShopFavor(detail.shopinfo.id)}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image style={{ marginRight: scale(5), width: scale(16), height: scale(16) }} source={require("../../images/collected_icon.png")} />
                                <Text style={{ marginRight: scale(5), color: "#6A617A", fontSize: scale(12) }}>已收藏店铺</Text>
                            </View>
                        </Touchable>
                    ) : (
                            <Touchable onPress={() => this.addShopFavor(detail.shopinfo.id)}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image style={{ marginRight: scale(5), width: scale(16), height: scale(16) }} source={require("../../images/shop_collection_icon.png")} />
                                    <Text style={{ marginRight: scale(5), color: "#6A617A", fontSize: scale(12) }}>收藏店铺</Text>
                                </View>
                            </Touchable>
                        )}
                </View>
                <ScrollView>
                    <CommodityList list={detail.commoditys.map(it => ({
                        id: it.commodity_id,
                        imageUrl: it.commodity_image,
                        name: it.small_text,
                        price: it.deduct_price
                    }))} />
                </ScrollView>
            </View>
        )
    }
}