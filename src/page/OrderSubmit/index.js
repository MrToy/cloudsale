import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Toast from 'react-native-root-toast';
import { scale } from '../../utils/dimension';
import { alipay, wechatPay } from '../../utils/pay';
import UserStore from '../../utils/user'
import { observer } from "mobx-react"
import Checkbox from '../../components/Checkbox'

class OrderSubmitPage extends React.Component {
    static navigationOptions = {
        title: '确认订单',
        headerRight: <View />,
    }
    state = {
        list: [],
        orderId: null,
        payway: "wechat"
    }
    componentDidMount() {
        const list = this.props.navigation.getParam('list')
        this.setState({ list: list || [] })
    }
    getSelectList() {
        var list = []
        for (let j = 0; j < this.state.list.length; j++) {
            for (let i = 0; i < this.state.list[j].goodsList.length; i++) {
                list.push(this.state.list[j].goodsList[i])
            }
        }
        return list
    }
    getSelectPrice() {
        var list = this.getSelectList()
        return list.map(it => (it.deductPrice || 0) * it.count).reduce(((a, b) => a + b), 0)
    }
    async onConfirm() {
        var user = UserStore.user
        if (!user) {
            this.props.navigation.navigate('UserLogin')
            return
        }
        var { payway, orderId } = this.state
        if (!orderId) {
            orderId = await this.createOrder(user.tokeninfo)
            this.setState({ orderId })
        }
        if (payway == "alipay") {
            await alipay(user.tokeninfo, orderId)
        }
        if (payway == "wechat") {
            await wechatPay(user.tokeninfo, orderId)
        }
    }
    async createOrder(token) {
        var goods = []
        this.state.list.forEach(it => {
            it.goodsList.forEach(good => {
                goods.push(good)
            })
        })
        var res = await fetch("https://www.bjzntq.com:8888/Order/CreateOrder/", {
            method: "POST",
            body: JSON.stringify({
                tokeninfo: token,
                order_commodity_id: goods.map(it => it.commodityId || 'null').join(","),
                order_commodity_num: goods.map(it => it.count || 'null').join(","),
                specifications_value_id: goods.map(it => it.specificationsId || 'null').join(","),
                address_id: 16,
                total: goods.map(it => it.deductPrice).reduce((a, b) => a + b)
            })
        }).then(res => res.json())
        if (res.result != 200) {
            Toast.show(res.message, {
                position: Toast.positions.CENTER
            })
            return
        }
        return res.data
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView>
                    <Image source={require("../../images/color_line_icon.png")} style={{ width: "100%", height: scale(4), marginTop: 1 }} />
                    <Touchable onPress={() => this.props.navigation.navigate('UserAddress')} >
                        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", height: scale(90) }}>
                            <Image source={require("../../images/location_icon.png")} style={{ width: scale(16), height: scale(22), marginLeft: scale(18), marginRight: scale(15) }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "#6A617A", fontSize: scale(15), marginBottom: scale(9) }}>收货人: </Text>
                                <Text style={{ color: "#A4A0AA", fontSize: scale(13) }} numberOfLines={2}>收货地址: </Text>
                            </View>
                            <Image source={require("../../images/right_indicator.png")} style={{ marginRight: scale(20), marginLeft: scale(15) }} />
                        </View>
                    </Touchable>
                    {this.state.list.map((it, i) => (
                        <View key={i} style={{ backgroundColor: "#fff", marginTop: scale(5) }}>
                            <View style={{ flexDirection: "row", alignItems: "center", height: scale(39), borderColor: "#ECECEC", borderBottomWidth: 1 }}>
                                <Image source={require('../../images/shop_icon.png')} style={{ marginLeft: scale(17), marginRight: scale(10) }} />
                                <Text style={{ color: "#6A617A", fontSize: scale(13) }}>{it.shopName}</Text>
                            </View>
                            {(it.goodsList || []).map((itit, ii) => (
                                <View key={ii} style={{ flexDirection: "row", alignItems: "center", borderColor: "#ECECEC", borderBottomWidth: 1, marginLeft: scale(18), paddingRight: scale(20), height: scale(106) }}>
                                    <Image source={{ uri: itit.thumb }} style={{ width: scale(80), height: scale(80), borderColor: "#ECECEC", borderWidth: 1 }} />
                                    <View style={{ marginLeft: scale(15), flex: 1 }}>
                                        <Text style={{ fontSize: scale(12), color: "#6A617A", lineHeight: scale(16), height: scale(32) }} numberOfLines={2}>{itit.smallText}</Text>
                                        <Text style={{ fontSize: scale(11), color: "#989898", marginTop: scale(6), lineHeight: scale(19) }}>规格: {itit.specificationsValue}</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: scale(6) }}>
                                            <Text style={{ fontSize: scale(15), color: "#E339D3", flex: 1 }}>¥ {itit.deductPrice}</Text>
                                            <Text style={{ fontSize: scale(13), color: "#6A617A" }}>x{itit.count}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: scale(24), height: scale(50), backgroundColor: "#fff", marginTop: scale(5), alignItems: "center", paddingRight: scale(18) }}>
                        <Text style={{ fontSize: scale(14), color: "#6A617A" }}>实付金额 :  </Text>
                        <Text style={{ color: "#E339D3", fontSize: scale(16) }}>¥ {this.getSelectPrice()}</Text>
                    </View>
                    <View style={{ backgroundColor: "#fff" }}>
                        <View style={{ height: scale(38), justifyContent: "center", paddingLeft: scale(18), paddingRight: scale(18), borderColor: "#EEEDF3", borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: scale(14), color: "#6A617A" }}>请选择支付方式</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", height: scale(45), paddingLeft: scale(18), paddingRight: scale(18), borderColor: "#EEEDF3", borderBottomWidth: 1 }}>
                            <Image style={{ width: scale(29), height: scale(24) }} source={require('../../images/wechatpay.png')} />
                            <Text style={{ fontSize: scale(14), color: "#6A617A", marginLeft: scale(20), flex: 1 }}>微信</Text>
                            <Checkbox value={this.state.payway == 'wechat'} onChange={val => val && this.setState({ payway: "wechat" })} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", height: scale(45), paddingLeft: scale(18), paddingRight: scale(18), borderColor: "#EEEDF3", borderBottomWidth: 1 }}>
                            <Image style={{ width: scale(26), height: scale(26) }} source={require('../../images/alipay.png')} />
                            <Text style={{ fontSize: scale(14), color: "#6A617A", marginLeft: scale(20), flex: 1 }}>支付宝</Text>
                            <Checkbox value={this.state.payway == 'alipay'} onChange={val => val && this.setState({ payway: "alipay" })} />
                        </View>
                        <View style={{ paddingLeft: scale(18), paddingRight: scale(18), paddingTop: scale(23), paddingBottom: scale(35) }}>
                            <Touchable onPress={() => this.onConfirm()} style={{ height: scale(40), backgroundColor: "#781EFD", borderRadius: scale(5), justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "#fff", fontSize: scale(16) }}>立即支付</Text>
                            </Touchable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


export default observer(OrderSubmitPage)