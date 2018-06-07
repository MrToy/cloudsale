import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { scale } from '../../utils/dimension';
import Touchable from 'react-native-platform-touchable'
import { getUserInfo } from '../../components/User'
import Toast from 'react-native-root-toast'
import Alipay from 'react-native-yunpeng-alipay'
import * as WeChat from 'react-native-wechat';
import md5 from 'md5'

export default class extends React.Component {
    static navigationOptions = {
        title: '确认订单',
        headerRight: <View />,
    }
    state = {
        list: [],
        orderId: null
    }
    componentDidMount() {
        const list = this.props.navigation.getParam('list')
        this.setState({ list: list || [] })
    }
    async onConfirm(type) {
        var user = await getUserInfo()
        var orderId = this.state.orderId
        if (!orderId) {
            orderId = await this.createOrder(user.tokeninfo)
            this.setState({ orderId })
        }
        if (type == "alipay") {
            await this.alipay(user.tokeninfo, orderId)
        }
        if (type == "wechat") {
            await this.wechatPay(user.tokeninfo, orderId)
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
    async wechatPay(token, id) {
        var res = await fetch("https://www.bjzntq.com:8888/APP/Pay/AppOrderWxPay/", {
            method: "POST",
            body: JSON.stringify({
                tokeninfo: token,
                order_code: id
            })
        }).then(res => res.json())
        if (res.result != 200) {
            Toast.show(res.message, {
                position: Toast.positions.CENTER
            })
            return
        }
        var _sign=md5(`${res.data.prepay_id}${res.data.appId}${res.data.partnerid}${res.data.timeStamp}bjzntq2017`)
        if(res.data.sign!=_sign){
            Toast.show("签名错误", {
                position: Toast.positions.CENTER
            })
            return
        }
        try {
            var data = await WeChat.pay({
                partnerId: res.data.partnerid,
                prepayId: res.data.prepay_id,
                nonceStr: res.data.nonceStr,
                timeStamp: res.data.timeStamp,
                package: "com.zntq.ZhiNuoShop",
                sign: res.data.paySign
            })
        } catch (err) {
            Toast.show(err.message, {
                position: Toast.positions.CENTER
            })
        }
        console.log(data)
    }
    async alipay(token, id) {
        var res = await fetch("https://www.bjzntq.com:8888/APP/Pay/AppOrderAliPay/ ", {
            method: "POST",
            body: JSON.stringify({
                tokeninfo: token,
                order_code: id
            })
        }).then(res => res.json())
        if (res.result != 200) {
            Toast.show(res.message, {
                position: Toast.positions.CENTER
            })
            return
        }
        var res = Alipay.pay(res.data)
    }
    render() {
        const id = this.props.navigation.getParam('id')
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView style={{ flex: 1 }}>
                    <Image source={require("../../images/color_line_icon.png")} style={{ width: "100%", height: scale(4), marginTop: 1 }} />
                    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", height: scale(90) }}>
                        <Image source={require("../../images/location_icon.png")} style={{ width: scale(16), height: scale(22) }} />
                        <View>
                            <Text>收货人: xx</Text>
                            <Text>收货地址: xx</Text>
                        </View>
                        <Image source={require("../../images/right_indicator.png")} style={{ width: scale(7), height: scale(12.4) }} />
                    </View>
                    {this.state.list.map((it, i) => (
                        <View key={i} style={{ backgroundColor: "#fff", padding: scale(10) }}>
                            <View style={{ flexDirection: "row", alignItems: "center", height: scale(39) }}>
                                <Text>{it.shopName}</Text>
                            </View>
                            {it.goodsList.map((itit, ii) => (
                                <View key={ii} style={{ flexDirection: "row", alignItems: "center", borderTopColor: "#ECECEC", borderTopWidth: 1 }}>
                                    <Image source={{ uri: itit.thumb }} style={{ width: scale(80), height: scale(80) }} />
                                    <View>
                                        <Text>{itit.smallText}</Text>
                                        <Text>规格: {itit.specificationsValue}</Text>
                                    </View>
                                    <View>
                                        <Text>¥ {itit.deductPrice}</Text>
                                        <Text>¥ {itit.price}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
                <View>
                    <View>
                        <Text>实付金额:</Text>
                        <Text>¥ 134.00</Text>
                    </View>
                    <Touchable onPress={() => this.onConfirm("alipay")}>
                        <Text>支付宝支付</Text>
                    </Touchable>
                    <Touchable onPress={() => this.onConfirm("wechat")}>
                        <Text>微信支付</Text>
                    </Touchable>
                </View>
            </View>
        );
    }
}