import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../utils/dimension';
import request from '../../utils/request';
import UserStore from '../../utils/user'
import PayModal from '../../components/PayModal';
import { alipay, wechatPay } from '../../utils/pay';
import Toast from 'react-native-root-toast';
import LoadImage from '../../components/LoadImage';


const ShopCommidity = ({ list }) => (
    <View>
        {list.map((shop, i) => (
            <View key={i} style={{ backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row", height: scale(35), alignItems: "center", borderBottomColor: "#EEEDF3", borderBottomWidth: 1, paddingLeft: scale(17) }}>
                    <Image source={require('../../images/shop_icon.png')} />
                    <Text style={{ fontSize: scale(13), color: '#6A617A', marginLeft: scale(12) }}>{shop.shop_name}</Text>
                </View>
                {shop.commodity_list.map((good, ii) => (
                    <View key={ii} style={{ flexDirection: "row", alignItems: "center", borderColor: "#ECECEC", borderBottomWidth: 1, marginLeft: scale(17), marginRight: scale(17), paddingTop: scale(12), paddingBottom: scale(12) }}>
                        <LoadImage source={{ uri: good.commodity_url }} style={{ width: scale(80), height: scale(80), marginRight: scale(15) }} />
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
    </View>
)

const OrderStatusMap = {
    0: "待付款",
    1: "待收货",
    2: "待评价",
    3: "完成订单"

}

const styles = StyleSheet.create({
    formBox: {
        marginBottom: scale(7), paddingTop: scale(15), paddingBottom: scale(10), backgroundColor: "#fff"
    },
    formLine: {
        flexDirection: "row", paddingHorizontal: scale(15), marginBottom: scale(5)
    },
    label: {
        fontSize: scale(12), color: "#A4A0AA", lineHeight: scale(17), width: scale(60), letterSpacing: scale(-0.41)
    },
    content: {
        fontSize: scale(12), color: "#6A617A", lineHeight: scale(17)
    }
})

const Button = ({ children, onPress }) => (
    <Touchable onPress={onPress} style={{width:"100%"}}>
        <View style={{ height: scale(30), backgroundColor: "#ECE4F8", alignItems: "center", justifyContent: "center", borderRadius: scale(5) }}>
            <Text style={{ fontSize: scale(12), color: "#781EFD", letterSpacing: scale(0.2) }}>{children}</Text>
        </View>
    </Touchable>
)

const FloatButton = ({ children, onPress }) => (
    <Touchable onPress={onPress} style={{ position: "absolute", zIndex: 2, top: scale(14), right: scale(20) }}>
        <View style={{ width: scale(73), height: scale(30), backgroundColor: "#781EFD", alignItems: "center", justifyContent: "center", borderRadius: scale(5) }}>
            <Text style={{ fontSize: scale(12), color: "#fff", letterSpacing: scale(0.2) }}>{children}</Text>
        </View>
    </Touchable>
)

export default class extends React.Component {
    static navigationOptions = {
        title: '订单详情',
        headerRight: <View />,
    }
    state = {
        detail: {},
        showPay: false
    }
    componentDidMount() {
        this.fetchDetail()
    }
    async fetchDetail() {
        const orderId = this.props.navigation.getParam('orderId')
        const orderCode = this.props.navigation.getParam('orderCode')
        var res = await request("https://www.xinyun.shop:8888/Order/GetOrderInfo/", {
            tokeninfo: UserStore.user.tokeninfo,
            id: orderId || undefined,
            order_code: orderCode || undefined
        })
        this.setState({ detail: res.data || {} })
    }
    async onPay(type) {
        const order_info = this.state.detail.order_info || {}
        var order_code = order_info.order_code
        var user = UserStore.user
        try {
            if (type == "alipay") {
                await alipay(user.tokeninfo, order_code)
            }
            if (type == "wechat") {
                await wechatPay(user.tokeninfo, order_code)
            }
        } catch (err) {
            Toast.show(err.message, {
                position: Toast.positions.CENTER
            })
            return
        }
        this.setState({ showPay: false })
        this.fetchDetail()
    }
    onCancle(order_code) {
        Alert.alert("确认取消订单?", null, [
            { text: "取消" },
            {
                text: "确定", onPress: async () => {
                    var res = await request("https://www.xinyun.shop:8888/Order/CancelOrder/", {
                        tokeninfo: UserStore.user.tokeninfo,
                        order_code
                    })
                    Toast.show(res.message, {
                        position: Toast.positions.CENTER
                    })
                    this.props.navigation.goBack()
                    var callback = this.props.navigation.getParam('callback')
                    if (callback) {
                        callback()
                    }
                }
            }
        ])
    }
    render() {
        const { commodity_list, order_address, order_info } = this.state.detail
        if (!commodity_list || !order_address || !order_info) {
            return null
        }
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView>
                    <View style={styles.formBox}>
                        {order_info.status == 0 && (
                            <FloatButton onPress={() => this.setState({ showPay: true })}>去支付</FloatButton>
                        )}
                        <View style={styles.formLine}>
                            <Text style={styles.label}>订单状态：</Text>
                            <Text style={[styles.content, { color: "#E339D3" }]}>{OrderStatusMap[order_info.status]}</Text>
                        </View>
                        <View style={styles.formLine}>
                            <Text style={styles.label}>订单编号：</Text>
                            <Text style={styles.content}>{order_info.order_code}</Text>
                        </View>
                        <View style={styles.formLine}>
                            <Text style={styles.label}>下单时间：</Text>
                            <Text style={styles.content}>{order_info.create_time}</Text>
                        </View>
                        {order_info.status == 0 && (
                            <View style={{ paddingHorizontal: scale(28), flexDirection: "row", marginTop: scale(5)}}>
                                <Button onPress={() => this.onCancle(order_info.order_code)}>申请取消订单</Button>
                                {/* <Button>重新下单</Button> */}
                            </View>
                        )}
                    </View>
                    <View style={styles.formBox}>
                        <View style={styles.formLine}>
                            <Text style={styles.label}>商品金额：</Text>
                            <Text style={[styles.content, { color: "#E339D3" }]}>¥{order_info.total}</Text>
                            <Text style={[styles.content, { marginLeft: scale(5) }]}>(在线支付)</Text>
                        </View>
                        <View style={styles.formLine}>
                            <Text style={styles.label}>收货地址：</Text>
                            <Text style={styles.content} numberOfLines={2}>{`${order_address.province}${order_address.area}${order_address.municipality}${order_address.detail}`}</Text>
                        </View>
                        <View style={styles.formLine}>
                            <Text style={styles.label}>收货人：</Text>
                            <Text style={styles.content}>{order_address.recipients} {order_address.phone}</Text>
                        </View>
                    </View>
                    {/* <View style={styles.formBox}>
                        <View style={styles.formLine}>
                            <Text style={styles.label}>发票类型：</Text>
                            <Text style={styles.content}>普通发票</Text>
                        </View>
                        <View style={styles.formLine}>
                            <Text style={styles.label}>发票抬头：</Text>
                            <Text style={styles.content}>个人</Text>
                        </View>
                        <View style={styles.formLine}>
                            <Text style={styles.label}>发票内容：</Text>
                            <Text style={styles.content}>商品明细</Text>
                        </View>
                    </View> */}
                    <ShopCommidity list={commodity_list} />
                    <View style={{ height: scale(45), marginTop: scale(7), paddingHorizontal: scale(17), flexDirection: "row", justifyContent: "flex-end", alignItems: "center", backgroundColor: "#fff" }}>
                        <Text style={{ fontSize: scale(14), color: "#6A617A" }}>应付金额:</Text>
                        <Text style={{ fontSize: scale(14), color: "#E339D3", marginLeft: scale(10) }}>¥{order_info.total}</Text>
                    </View>
                </ScrollView>
                <PayModal
                    visible={this.state.showPay}
                    onClose={() => this.setState({ showPay: false })}
                    onPay={this.onPay.bind(this)} />
            </View>
        );
    }
}