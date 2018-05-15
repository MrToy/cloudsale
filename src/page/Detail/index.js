import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import TouchableEx from '../../components/TouchableEx';
import { scale } from '../../utils/dimension';
import Swiper from '../Main/Swiper';

class CardTitle extends React.Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        color: PropTypes.string
    }
    render() {
        var { label, color } = this.props
        color = color || '#781EFD'
        return (
            <View style={{ marginBottom: scale(1), paddingTop: scale(6), paddingBottom: scale(6), backgroundColor: '#fff' }}>
                <View style={{ borderLeftColor: color, borderLeftWidth: scale(2), height: scale(23), justifyContent: "center" }}>
                    <Text style={{ color, marginLeft: scale(10), fontSize: scale(13) }}>{label}</Text>
                </View>
            </View>
        );
    }
}

class BottomBar extends React.Component {
    render() {
        const {navigation,id}=this.props
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", height: scale(55), backgroundColor: "#fff" }}>
                <View>
                    <Text>收藏</Text>
                </View>
                <View>
                    <Text>客服</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <TouchableEx>
                        <View style={{ backgroundColor: "#ECE4F8", height: "100%", width: scale(131), justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: scale(15), color: "#781EFD" }}>加入购物车</Text>
                        </View>
                    </TouchableEx>
                    <TouchableEx onPress={()=>navigation.navigate('OrderSubmit',{id})}>
                        <View style={{ backgroundColor: "#781EFD", height: "100%", width: scale(126), justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: scale(15), color: "#fff" }}>立即购买</Text>
                        </View>
                    </TouchableEx>
                </View>
            </View>
        )
    }
}

export default class extends React.Component {
    static navigationOptions = {
        title: '商品详情',
        headerRight: <View />,
    }
    state = {
        banner: [],
        detail: {}
    }
    componentDidMount() {
        const id = this.props.navigation.getParam('id')
        this.fetchCommodity(id)
    }
    async fetchCommodity(id) {
        var res = await fetch("https://www.bjzntq.com:8888/Commodity/getCommodityDetail/", {
            method: "POST",
            body: JSON.stringify({
                commodity_id: id
            })
        }).then(res => res.json())
        this.setState({
            banner: res.data.banner,
            detail: _.pick(res.data, ['original_price', 'small_text', 'shop_name', 'description', 'stock_count', 'name', 'deduct_price', 'shop_allgoods_count', 'category_id', 'id'])
        })
    }
    render() {
        const { navigation } = this.props
        const banner = this.state.banner.map(it => ({
            imageUrl: it.image_url,
            id: it.id
        }))
        const { detail } = this.state
        return (
            <View style={{ backgroundColor: '#f1f1f1', flex: 1 }}>
                <ScrollView>
                    <View style={{ height: scale(225), marginBottom: scale(5) }}>
                        {banner.length ? (
                            <Swiper list={banner} />
                        ) : null}
                    </View>
                    <View style={{ height: scale(126), backgroundColor: "#fff", marginBottom: scale(6) }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15) }}>¥{detail.deduct_price}</Text>
                            <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15), textDecorationLine: "line-through" }}>¥{detail.original_price}</Text>
                        </View>
                        <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15) }}>{detail.name}</Text>
                    </View>
                    <CardTitle label="已选 1个" />
                    <View style={{ height: scale(126), backgroundColor: "#fff", marginBottom: scale(6) }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15) }}>¥{detail.deduct_price}</Text>
                            <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15), textDecorationLine: "line-through" }}>¥{detail.original_price}</Text>
                        </View>
                        <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15) }}>{detail.name}</Text>
                    </View>
                    <CardTitle label="服务" />
                    <View style={{ height: scale(126), backgroundColor: "#fff", marginBottom: scale(6) }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15) }}>¥{detail.deduct_price}</Text>
                            <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15), textDecorationLine: "line-through" }}>¥{detail.original_price}</Text>
                        </View>
                        <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15) }}>{detail.name}</Text>
                    </View>
                    <CardTitle label="商铺信息" />
                    <CardTitle label="猜你喜欢" />
                    <CardTitle label="商品介绍" />
                </ScrollView>
                <BottomBar navigation={navigation} id={detail.id} />
            </View>
        );
    }
}