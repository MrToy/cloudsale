import React from 'react';
import { Image, ScrollView, Text, View, Alert } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Toast from 'react-native-root-toast';
import { scale } from '../../utils/dimension';
import { alipay, wechatPay } from '../../utils/pay';
import UserStore from '../../utils/user'
import { observer } from "mobx-react"
import Checkbox from '../../components/Checkbox'
import request from '../../utils/request'

class OrderSubmitPage extends React.Component {
    static navigationOptions = {
        title: '确认订单',
        headerRight: <View />,
    }
    state = {
        list: [],
        orderCode: null,
        payway: "wechat",
        addr: null,
    }
    componentDidMount() {
        const list = this.props.navigation.getParam('list')
        this.setState({ list: list || [] })
        this.fetchAddr()
    }
    async fetchAddr() {
        var res = await request("https://www.xinyun.shop:8888/Account/getDefaultAddress/", {
            "tokeninfo": UserStore.user.tokeninfo
        })
        if (!res.data || !res.data.id) {
            return
        }
        this.setState({ addr: res.data })
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
        return list.map(it => (it.deductPrice * 100 || 0) * it.count / 100).reduce(((a, b) => a + b), 0)
    }
    async onConfirm() {
        if (!this.state.addr) {
            Alert.alert("请选择一个地址")
            return
        }
        var user = UserStore.user
        if (!user) {
            this.props.navigation.navigate('UserLogin')
            return
        }
        var { payway, orderCode } = this.state
        if (!orderCode) {
            try {
                orderCode = await this.createOrder(user.tokeninfo, this.state.addr.id)
                this.setState({ orderCode })
            } catch (err) {
                Toast.show(err.message, {
                    position: Toast.positions.CENTER
                })
                return
            }
        }
        try {
            if (payway == "alipay") {
                await alipay(user.tokeninfo, orderCode)
            }
            if (payway == "wechat") {
                await wechatPay(user.tokeninfo, orderCode)
            }
        } catch (err) {
            Toast.show(err.message, {
                position: Toast.positions.CENTER
            })
            return
        }
        this.props.navigation.replace('OrderDetail', { orderCode })
    }
    selectAddress() {
        this.props.navigation.navigate('SelectAddress', {
            onSelect: (addr) => {
                this.setState({ addr })
            },
            currentId: this.state.addr ? this.state.addr.id : null
        })
    }
    async createOrder(token, addrId) {
        var goods = []
        this.state.list.forEach(it => {
            it.goodsList.forEach(good => {
                goods.push(good)
            })
        })
        var res = await request("https://www.xinyun.shop:8888/Order/CreateOrder/", {
            tokeninfo: token,
            order_commodity_id: goods.map(it => it.commodityId || 'null').join(","),
            order_commodity_num: goods.map(it => it.count || 'null').join(","),
            specifications_value_id: goods.map(it => it.specificationsId || 'null').join(","),
            address_id: addrId,
            total: this.getSelectPrice()
        })
        return res.data
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView>
                    <Image source={require("../../images/color_line_icon.png")} style={{ width: "100%", height: scale(4), marginTop: 1 }} />
                    <Touchable onPress={this.selectAddress.bind(this)} >
                        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", height: scale(90) }}>
                            <Image source={require("../../images/location_icon.png")} style={{ width: scale(16), height: scale(22), marginLeft: scale(18), marginRight: scale(15) }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "#6A617A", fontSize: scale(15), marginBottom: scale(9) }}>收货人: {this.state.addr && this.state.addr.recipients}</Text>
                                <Text style={{ color: "#A4A0AA", fontSize: scale(13) }} numberOfLines={2}>收货地址: {this.state.addr && this.state.addr.detail}</Text>
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
                                            <Text style={{ fontSize: scale(15), color: "#E339D3", flex: 1 }}>¥ {itit.deductPrice.toFixed(2)}</Text>
                                            <Text style={{ fontSize: scale(13), color: "#6A617A" }}>x{itit.count}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: scale(24), height: scale(50), backgroundColor: "#fff", marginTop: scale(5), alignItems: "center", paddingRight: scale(18) }}>
                        <Text style={{ fontSize: scale(14), color: "#6A617A" }}>实付金额 :  </Text>
                        <Text style={{ color: "#E339D3", fontSize: scale(16) }}>¥ {this.getSelectPrice().toFixed(2)}</Text>
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