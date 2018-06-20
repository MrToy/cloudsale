import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Toast from 'react-native-root-toast';
import { getUserInfo } from '../../utils/user';
import { scale } from '../../utils/dimension';
import { alipay, wechatPay } from '../../utils/pay';

export default class OrderSubmitPage extends React.Component {
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
    async onConfirm(type) {
        var user = await getUserInfo()
        var orderId = this.state.orderId
        if (!orderId) {
            orderId = await this.createOrder(user.tokeninfo)
            this.setState({ orderId })
        }
        if (type == "alipay") {
            await alipay(user.tokeninfo, orderId)
        }
        if (type == "wechat") {
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
                <ScrollView style={{ flex: 1 }}>
                    <Image source={require("../../images/color_line_icon.png")} style={{ width: "100%", height: scale(4), marginTop: 1 }} />
                    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", height: scale(90) }}>
                        <Image source={require("../../images/location_icon.png")} style={{ width: scale(16), height: scale(22) }} />
                        <View>
                            <Text>收货人: </Text>
                            <Text>收货地址: </Text>
                        </View>
                        <Image source={require("../../images/right_indicator.png")} style={{ width: scale(7), height: scale(12.4) }} />
                    </View>
                    {this.state.list.map((it, i) => (
                        <View key={i} style={{ backgroundColor: "#fff", padding: scale(10) }}>
                            <View style={{ flexDirection: "row", alignItems: "center", height: scale(39) }}>
                                <Text>{it.shopName}</Text>
                            </View>
                            {(it.goodsList || []).map((itit, ii) => (
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
                <View style={{ backgroundColor: "#fff", padding:scale(18) }}>
                    <View style={{flexDirection:"row",justifyContent:"flex-end",marginBottom:scale(24)}}>
                        <Text>实付金额 :  </Text>
                        <Text style={{color:"#E339D3"}}>¥ {this.getSelectPrice()}</Text>
                    </View>
                    <Touchable onPress={() => this.onConfirm("alipay")} style={{height:scale(40),backgroundColor:"#781EFD",borderRadius:scale(5),justifyContent:"center",alignItems:"center",marginBottom:scale(10)}}>
                        <Text style={{color:"#fff",fontSize:scale(16)}}>支付宝支付</Text>
                    </Touchable>
                    <Touchable onPress={() => this.onConfirm("wechat")} style={{height:scale(40),backgroundColor:"#781EFD",borderRadius:scale(5),justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"#fff",fontSize:scale(16)}}>微信支付</Text>
                    </Touchable>
                </View>
            </View>
        );
    }
}