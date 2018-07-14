import PropTypes from 'prop-types';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FitImage from 'react-native-fit-image';
import Touchable from 'react-native-platform-touchable';
import Toast from 'react-native-root-toast';
import CommodityList from '../../components/CommodityList';
import NumberPicker from '../../components/NumberPicker';
import addCart from '../../utils/cart';
import { scale } from '../../utils/dimension';
import request from '../../utils/request';
import UserStore from '../../utils/user';
import Swiper from '../Main/Swiper';

const styles = StyleSheet.create({
    selectItem: {
        paddingLeft: scale(11), paddingRight: scale(11), height: scale(23.2), borderColor: "#C8BEDB", borderWidth: 1, justifyContent: "center", borderRadius: scale(2), marginRight: scale(7.7)
    },
    selectItemActive: {
        backgroundColor: "#E339D3", borderColor: "#E339D3"
    },
    selectItemText: {
        fontSize: scale(11), color: "#919191"
    },
    selectItemTextActive: {
        color: "#fff"
    }
})


class InfoCard extends React.Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        color: PropTypes.string,
        noPadding: PropTypes.bool
    }
    render() {
        var { label, color, noPadding } = this.props
        color = color || '#781EFD'
        return (
            <View style={{ marginBottom: scale(6), paddingTop: scale(6), backgroundColor: '#fff' }}>
                <View style={{ borderLeftColor: color, borderLeftWidth: scale(2), height: scale(23), justifyContent: "center" }}>
                    <Text style={{ color, marginLeft: scale(10), fontSize: scale(13) }}>{label}</Text>
                </View>
                <View style={[{ borderTopColor: "#eee", borderTopWidth: 1, marginTop: scale(5) }, !noPadding && { marginRight: scale(12), marginLeft: scale(12), paddingTop: scale(13), paddingBottom: scale(13) }]}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

export default class extends React.Component {
    static navigationOptions = {
        title: '商品详情',
        headerRight: <View />,
    }
    state = {
        detail: {},
        specifica: null,
        isCollect: false,
        isShopCollect: false,
        selectedNum: 1
    }
    componentDidMount() {
        const id = this.props.navigation.getParam('id')
        this.fetchCommodity(id)
        this.addRecord(id)
    }
    async addRecord(id){
        if(!UserStore.user){
            return
        }
        await request("https://www.bjzntq.com:8888/Commodity/addBrowseRecord/", {
            commodity_id: id,
            tokeninfo:UserStore.user.tokeninfo
        })
    }
    async fetchCommodity(id) {
        var res = await request("https://www.bjzntq.com:8888/Commodity/getCommodityDetail/", {
            commodity_id: id
        })
        this.setState({
            specifica: res.data.specifications &&res.data.specifications[0] && res.data.specifications[0].id,
            detail: res.data,
            isCollect: res.data.is_collect == 1,
            isShopCollect: res.data.shop_collected == 1
        })
    }
    async addFavor(id) {
        var user = UserStore.user
        if (!user) {
            this.props.navigation.navigate('UserLogin')
            return
        }
        var res = await request("https://www.bjzntq.com:8888/Commodity/collectCommodity/", {
            "tokeninfo": user.tokeninfo,
            "commodity_id": id
        })
        Toast.show(res.message, {
            position: Toast.positions.CENTER
        })
    }
    setSpecifica(it){
        this.setState({
            specifica:it.id,
            detail:{
                ...this.state.detail,
                deduct_price:it.deduct_price,
                original_price:it.original_price
            }
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
    }
    onBuy() {
        if (!this.state.detail.original_price) {
            return
        }
        var selectedSpecification = this.state.detail.specifications.find(it => it.id == this.state.specifica)
        var list = [
            {
                shopName: this.state.detail.shop_name,
                goodsList: [
                    {
                        deductPrice: this.state.detail.deduct_price,
                        price: this.state.detail.original_price,
                        count: this.state.selectedNum,
                        specificationsId: this.state.specifica,
                        specificationsValue: selectedSpecification ? selectedSpecification.value : null,
                        commodityId: this.state.detail.id,
                        thumb: this.state.detail.banner[0].image_url,
                        smallText: this.state.detail.small_text
                    }
                ]
            }
        ]
        this.props.navigation.navigate('OrderSubmit', { list })
    }
    render() {
        const banner = (this.state.detail.banner || []).map(it => ({
            imageUrl: it.image_url,
            id: it.id
        }))
        const { detail, selectedNum, specifica } = this.state
        return (
            <View style={{ backgroundColor: '#f1f1f1', flex: 1 }}>
                <ScrollView>
                    <View style={{ height: scale(225), marginBottom: scale(5) }}>
                        {banner.length ? (
                            <Swiper list={banner} />
                        ) : null}
                    </View>
                    <View style={{ height: scale(126), backgroundColor: "#fff", paddingBottom: scale(6), paddingLeft: scale(18), paddingRight: scale(10), marginBottom: scale(6) }}>
                        <View style={{ flexDirection: "row", marginTop: scale(7), alignItems: "center" }}>
                            <Text style={{ fontSize: scale(28), color: "#E339D3" }}>¥{detail.deduct_price}</Text>
                            <Text style={{ fontSize: scale(14), marginTop: scale(5), marginLeft: scale(15), color: "#A1A1A1", textDecorationLine: "line-through" }}>¥{detail.original_price}</Text>
                        </View>
                        <Text style={{ fontSize: scale(14), lineHeight: scale(19), marginTop: scale(7), color: "#6A617A" }}>{detail.name}</Text>
                        <Text style={{ marginTop: scale(9), color: "#959595" }}>免邮费</Text>
                    </View>
                    <InfoCard label={`已选 ${selectedNum}个`}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: scale(11) }}>
                            <Text style={{ marginRight: scale(19) }}>规格</Text>
                            {(detail.specifications || []).map(it => (
                                <Touchable key={it.id} onPress={() => this.setSpecifica(it)}>
                                    <View style={[styles.selectItem, specifica == it.id && styles.selectItemActive]}>
                                        <Text style={[styles.selectItemText, specifica == it.id && styles.selectItemTextActive]}>{it.value}</Text>
                                    </View>
                                </Touchable>
                            ))}
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ marginRight: scale(19) }}>数量</Text>
                            <NumberPicker value={selectedNum} onChange={val => this.setState({ selectedNum: val })} />
                        </View>
                    </InfoCard>
                    <InfoCard label="服务">
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {(detail.service || []).map((it, i) => (
                                <Text key={i} style={{ marginRight: scale(10), fontSize: scale(12), color: "#6A617A", lineHeight: scale(22) }}>· {it.service_name}</Text>
                            ))}
                        </View>
                    </InfoCard>
                    <InfoCard label="商铺信息">
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: scale(15) }}>
                            <View style={{ flexDirection: "row", flex: 1,alignItems:"center" }}>
                                <Image style={{ marginRight: scale(10) }} source={require("../../images/shop_icon.png")} />
                                <Text style={{color:"#6A617A",fontSize:scale(12)}}>{detail.shop_name}</Text>
                            </View>
                            <Touchable onPress={()=>this.props.navigation.navigate('ShopDetail',{shopId:detail.shop_id,shopName:detail.shop_name})}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{color:"#6A617A",fontSize:scale(12)}}>进入店铺</Text>
                                    <Image style={{ marginTop: 3 }} source={require("../../images/right_indicator.png")} />
                                </View>
                            </Touchable>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{color:"#6A617A",fontSize:scale(12)}}>全部商品：{detail.shop_allgoods_count}</Text>
                            </View>
                            <Touchable onPress={()=>this.addShopFavor(detail.shop_id)}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image style={{ marginRight: scale(5) }} source={require("../../images/shop_collection_icon.png")} />
                                    <Text style={{ marginRight: scale(5),color:"#6A617A",fontSize:scale(12) }}>收藏店铺</Text>
                                </View>
                            </Touchable>
                        </View>
                    </InfoCard>
                    <InfoCard label="猜你喜欢" noPadding>
                        <View style={{ backgroundColor: "#f1f1f1" }}>
                            <CommodityList list={(detail.recommend || []).map(it => ({
                                id: it.id,
                                imageUrl: it.image_url,
                                name: it.small_text,
                                price: it.deduct_price
                            }))} />
                        </View>
                    </InfoCard>
                    <InfoCard label="商品介绍" noPadding>
                        {(detail.introduce_images || []).map((it, i) => (
                            <FitImage key={i} source={{ uri: it.image_url }} />
                        ))}
                    </InfoCard>
                </ScrollView>

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", height: scale(55), backgroundColor: "#fff" }}>
                    <Touchable onPress={() => this.addFavor(detail.id)}  style={{flex: 1 }}>
                        {this.state.isCollect ? (
                            <View style={{ alignItems: "center", justifyContent: "center",height:"100%"}}>
                                <Image style={{ width: scale(25), height: scale(25) }} source={require('../../images/my_collection_icon.png')} />
                                <Text style={{ fontSize: scale(12), color: "#F59100", marginTop: scale(3) }}>取消收藏</Text>
                            </View>
                        ) : (
                                <View style={{ alignItems: "center", justifyContent: "center",height:"100%"}}>
                                    <Image style={{ width: scale(25), height: scale(25) }} source={require('../../images/my_collection_icon.png')} />
                                    <Text style={{ fontSize: scale(12), color: "#F59100", marginTop: scale(3) }}>收藏</Text>
                                </View>
                            )}
                    </Touchable>
                    <Touchable style={{flex: 1 }}>
                        <View style={{ alignItems: "center", justifyContent: "center",height:"100%" }}>
                            <Image style={{ width: scale(25), height: scale(25) }} source={require('../../images/contact_icon.png')} />
                            <Text style={{ fontSize: scale(12), color: "#F76F8E", marginTop: scale(3) }}>客服</Text>
                        </View>
                    </Touchable>
                    <View style={{ flexDirection: "row" }}>
                        <Touchable onPress={() => addCart(detail.id)}>
                            <View style={{ backgroundColor: "#ECE4F8", height: "100%", width: scale(131), justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: scale(15), color: "#781EFD" }}>加入购物车</Text>
                            </View>
                        </Touchable>
                        <Touchable onPress={this.onBuy.bind(this)}>
                            <View style={{ backgroundColor: "#781EFD", height: "100%", width: scale(126), justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: scale(15), color: "#fff" }}>立即购买</Text>
                            </View>
                        </Touchable>
                    </View>
                </View>
            </View>
        );
    }
}