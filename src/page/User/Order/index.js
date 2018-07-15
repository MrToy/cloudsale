import { observer } from "mobx-react";
import React from 'react';
import { Alert, FlatList, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Toast from 'react-native-root-toast';
import PayModal from '../../../components/PayModal';
import { scale } from '../../../utils/dimension';
import { alipay, wechatPay } from '../../../utils/pay';
import request from '../../../utils/request';
import UserStore from '../../../utils/user';
import SearchButton from '../../Main/SearchButton';

class PayOrder extends React.Component {
    render() {
        const order = this.props.data
        return (
            <TouchableWithoutFeedback onPress={this.props.onDetail}>
                <View style={{ backgroundColor: "#fff", marginTop: scale(6) }}>
                    <View style={{ flexDirection: "row", height: scale(32), alignItems: "center", borderBottomColor: "#EEEDF3", borderBottomWidth: 1, paddingLeft: scale(17) }}>
                        <Text style={{ fontSize: scale(13), color: '#A4A0AA' }}>订单号:</Text>
                        <Text style={{ fontSize: scale(13), color: '#6A617A', letterSpacing: scale(0.28), marginLeft: scale(5) }}>{order.order_code}</Text>
                    </View>
                    {order.shop_list.map((shop, i) => (
                        <View key={i} >
                            <View style={{ flexDirection: "row", height: scale(35), alignItems: "center", borderBottomColor: "#EEEDF3", borderBottomWidth: 1, paddingLeft: scale(17) }}>
                                <Image source={require('../../../images/shop_icon.png')} />
                                <Text style={{ fontSize: scale(13), color: '#6A617A', marginLeft: scale(12) }}>{shop.shop_name}</Text>
                            </View>
                            {shop.commodity_list.map((good, ii) => (
                                <View key={ii} style={{ flexDirection: "row", alignItems: "center", borderColor: "#ECECEC", borderBottomWidth: 1, marginLeft: scale(17), marginRight: scale(17), paddingTop: scale(12), paddingBottom: scale(12) }}>
                                    <Image source={{ uri: good.commodity_url || 'https://misc.360buyimg.com/mtd/pc/common/img/blank.png' }} style={{ width: scale(80), height: scale(80), marginRight: scale(15) }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: scale(12), color: "#6A617A", lineHeight: scale(16) }} numberOfLines={2}>{good.commodity_name}</Text>
                                        <Text style={{ fontSize: scale(11), color: "#989898", lineHeight: scale(19), marginTop: scale(6) }}>规格: {good.specifications_value}</Text>
                                        <View style={{ marginTop: scale(6), flexDirection: "row" }}>
                                            <Text style={{ color: "#E339D3", fontSize: scale(15), flex: 1 }}>¥ {good.deduct_price}</Text>
                                            <Text style={{ color: "#6A617A", fontSize: scale(13) }}>x{good.count}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginBottom: scale(20), marginTop: scale(14), marginRight: scale(18) }}>
                        <Text style={{ color: "#6A617A", fontSize: scale(14) }}>应付金额：</Text>
                        <Text style={{ color: "#E339D3", fontSize: scale(16) }}>¥{order.order_total}</Text>
                    </View>
                    {order.order_status == 0 && (
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginBottom: scale(13) }}>
                            <Touchable onPress={() => this.props.onCancle(order.order_code)} style={{ width: scale(100), height: scale(31), marginRight: scale(13), backgroundColor: "#ECE4F8", alignItems: "center", justifyContent: "center", borderRadius: scale(4) }}>
                                <Text style={{ color: "#781EFD", fontSize: scale(13) }}>取消订单</Text>
                            </Touchable>
                            <Touchable onPress={() => this.props.onPay(order.order_code)} style={{ width: scale(100), height: scale(31), marginRight: scale(18), backgroundColor: "#781EFD", alignItems: "center", justifyContent: "center", borderRadius: scale(4) }}>
                                <Text style={{ color: "#fff", fontSize: scale(13) }}>付款</Text>
                            </Touchable>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}



class PageUserOrder extends React.Component {
    static navigationOptions = {
        title: '我的订单',
        headerRight: <View />,
    }
    state = {
        type: 5,
        searchKey: "",
        list: [],
        order_id: null,
        loading: false
    }
    componentDidMount() {
        var type = this.props.navigation.getParam('type')
        if (type === null) {
            type = 5
        }
        this.onTab(type)
    }
    onTab(type) {
        this.setState({ type }, () => {
            this.fetchList()
        })
    }
    onCancle(index) {
        Alert.alert("确认取消订单?", null, [
            { text: "取消" },
            {
                text: "确定", onPress: async () => {
                    var res = await request("https://www.bjzntq.com:8888/Order/CancelOrder/", {
                        tokeninfo: UserStore.user.tokeninfo,
                        order_code: this.state.list[index].order_code
                    })
                    Toast.show(res.message, {
                        position: Toast.positions.CENTER
                    })
                    var list = [...this.state.list]
                    list.splice(index, 1)
                    this.setState({ list })
                }
            }
        ])
    }
    async fetchList() {
        this.setState({ loading: true })
        var user = UserStore.user
        if (!user) {
            this.props.navigation.navigate('UserLogin', {
                callback: this.fetchList.bind(this)
            })
            return
        }
        var res = await fetch("https://www.bjzntq.com:8888/Order/GetAllOrders/", {
            method: "POST",
            body: JSON.stringify({
                tokeninfo: user.tokeninfo,
                status: this.state.type
            })
        }).then(res => res.json())
        this.setState({
            list: res.data || [],
            loading: false,
        })
    }
    async onPay(type) {
        var orderId = this.state.order_id
        var user = UserStore.user
        try {
            if (type == "alipay") {
                await alipay(user.tokeninfo, orderId)
            }
            if (type == "wechat") {
                await wechatPay(user.tokeninfo, orderId)
            }
        } catch (err) {
            Toast.show(err.message, {
                position: Toast.positions.CENTER
            })
            return
        }
        this.setState({order_id:null})
        this.fetchList()
        this.props.navigation.navigate('OrderDetail',{orderCode:orderId})
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <View style={{ height: scale(34), alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingLeft: scale(11), paddingRight: scale(11) }}>
                    <SearchButton placeholder="酸奶" style={{ backgroundColor: "#F3F2F8" }} />
                </View>
                <View style={{ height: scale(49), flexDirection: "row", backgroundColor: "#fff", marginTop: scale(5) }}>
                    {[
                        { type: 5, text: "全部订单" },
                        { type: 0, text: "待付款" },
                        { type: 1, text: "待收货" },
                        { type: 2, text: "待评价" },
                    ].map((tab, i) => (
                        <TouchableWithoutFeedback key={i} onPress={() => this.onTab(tab.type)}>
                            <View style={{ height: "100%", flex: 1, paddingLeft: scale(10), paddingRight: scale(10) }}>
                                <View style={[{ height: "100%", justifyContent: "center", alignItems: "center" }, tab.type == this.state.type && { borderBottomColor: "#E339D3", borderBottomWidth: scale(2), borderTopWidth: scale(2), borderTopColor: "transparent" }]}>
                                    <Text style={[{ fontSize: scale(14), color: '#6A617A' }, tab.type == this.state.type && { color: "#E339D3" }]}>{tab.text}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
                <FlatList
                    refreshing={this.state.loading}
                    onRefresh={this.fetchList.bind(this)}
                    data={this.state.list}
                    renderItem={({ item, index }) => (
                        <PayOrder
                            data={item}
                            onPay={id => this.setState({ order_id: id })}
                            onCancle={() => this.onCancle(index)}
                            onDetail={() => this.props.navigation.navigate('OrderDetail', { orderId: item.order_id, callback: this.fetchList.bind(this) })} />
                    )} />
                <PayModal
                    visible={this.state.order_id != null}
                    onClose={() => this.setState({ order_id: null })}
                    onPay={this.onPay.bind(this)} />
            </View>
        );
    }
}

export default observer(PageUserOrder)