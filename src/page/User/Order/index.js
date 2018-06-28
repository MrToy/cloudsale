import React from 'react';
import { FlatList, Image, Text, TouchableWithoutFeedback, View, Modal,Animated,Easing } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../utils/dimension';
import SearchButton from '../../Main/SearchButton';
import UserStore from '../../../utils/user';
import { alipay, wechatPay } from '../../../utils/pay';
import {observer} from "mobx-react"

class PayOrder extends React.Component {
    render() {
        const order = this.props.data
        return (
            <View style={{ backgroundColor: "#fff", marginTop: scale(6) }}>
                <View style={{ flexDirection: "row", height: scale(32), alignItems: "center", borderBottomColor: "#EEEDF3", borderBottomWidth: 1, paddingLeft: scale(17) }}>
                    <Text style={{ fontSize: scale(13), color: '#A4A0AA' }}>订单号:</Text>
                    <Text style={{ fontSize: scale(13), color: '#6A617A', letterSpacing: scale(0.28), marginLeft: scale(5) }}>{order.order_id}</Text>
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
                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginBottom: scale(13) }}>
                    <Touchable style={{ width: scale(100), height: scale(31), marginRight: scale(13), backgroundColor: "#ECE4F8", alignItems: "center", justifyContent: "center", borderRadius: scale(4) }}>
                        <Text style={{ color: "#781EFD", fontSize: scale(13) }}>取消订单</Text>
                    </Touchable>
                    <Touchable onPress={() => this.props.onPay(order.order_code)} style={{ width: scale(100), height: scale(31), marginRight: scale(18), backgroundColor: "#781EFD", alignItems: "center", justifyContent: "center", borderRadius: scale(4) }}>
                        <Text style={{ color: "#fff", fontSize: scale(13) }}>付款</Text>
                    </Touchable>
                </View>
            </View>
        )
    }
}

class PayModal extends React.Component {
    state={
        top:new Animated.Value(190)
    }
    componentDidUpdate(prevProps){
        if(this.props.visible==prevProps.visible){
            return
        }
        if(this.props.visible){
            Animated.timing(this.state.top, {
                toValue: 0,
                duration:200, 
                easing: Easing.easing
            }).start()
        }
    }
    close(){
        Animated.timing(this.state.top, {
            toValue: 190,
            duration: 200, 
            easing: Easing.easing
        }).start(()=>{
            this.props.onClose()
        })
    }
    render() {
        const { visible, onPay }=this.props
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={visible}
            >
                <View style={{ backgroundColor: "rgba(0,0,0,0.25)", height: "100%", justifyContent: "flex-end" }}>
                    <Animated.View style={{ backgroundColor: "#fff", paddingTop: scale(19), paddingLeft: scale(13), paddingRight: scale(13), height: scale(190), transform: [{ translateY: this.state.top }] }}>
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <Text style={{ color: "#6A617A", fontSize: scale(14) }}>请选择支付方式</Text>
                            <Touchable onPress={this.close.bind(this)}>
                                <Image source={require('../../../images/删除按钮.png')} />
                            </Touchable>
                        </View>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: scale(18) }}>
                            <Touchable onPress={() => onPay("wechat")}>
                                <View style={{ width: scale(150), height: scale(111), backgroundColor: "#F6F6F6", justifyContent: "center", alignItems: "center" }}>
                                    <Image source={require('../../../images/wechatpay.png')} />
                                    <Text style={{ fontSize: scale(14), marginTop: scale(8), color: "#6A617A" }}>微信支付</Text>
                                </View>
                            </Touchable>
                            <Touchable onPress={() => onPay("alipay")}>
                                <View style={{ width: scale(150), height: scale(111), backgroundColor: "#F6F6F6", justifyContent: "center", alignItems: "center" }}>
                                    <Image source={require('../../../images/alipay.png')} />
                                    <Text style={{ fontSize: scale(14), marginTop: scale(8), color: "#6A617A" }}>支付宝支付</Text>
                                </View>
                            </Touchable>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}



class PageUserOrder extends React.Component {
    static navigationOptions = {
        title: '我的订单',
        headerRight: <View />,
    }
    state = {
        type: 4,
        searchKey: "",
        list: [],
        order_id: null,
        loading: false
    }
    componentDidMount() {
        var type = this.props.navigation.getParam('type')
        if (type === null) {
            type = 4
        }
        this.onTab(type)
    }
    onTab(type) {
        this.setState({ type }, () => {
            this.fetchList()
        })
    }
    async fetchList() {
        this.setState({ loading: true })
        var user = UserStore.user
        if (!user) {
            this.props.navigation.navigate('UserLogin')
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
        var orderId=this.state.order_id
        var user = UserStore.user
        if (type == "alipay") {
            await alipay(user.tokeninfo, orderId)
        }
        if (type == "wechat") {
            await wechatPay(user.tokeninfo, orderId)
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <View style={{ height: scale(34), alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingLeft: scale(11), paddingRight: scale(11) }}>
                    <SearchButton placeholder="酸奶" style={{ backgroundColor: "#F3F2F8" }} />
                </View>
                <View style={{ height: scale(49), flexDirection: "row", backgroundColor: "#fff", marginTop: scale(5) }}>
                    {[
                        { type: 4, text: "全部订单" },
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
                    renderItem={({ item }) => (
                        <PayOrder data={item} key={item.order_id} onPay={id => this.setState({ order_id: id })} />
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