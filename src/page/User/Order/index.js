import React from 'react';
import { Text, View, TouchableWithoutFeedback, FlatList, Image } from 'react-native';
import { getUserInfo } from '../../../utils/user';
import { scale } from '../../../utils/dimension';
import SearchButton from '../../Main/SearchButton';
import Touchable from 'react-native-platform-touchable'


class PayOrder extends React.Component {
    render() {
        const order = this.props.data
        return (
            <View style={{ backgroundColor: "#fff", marginTop: scale(6) }}>
                <View style={{ flexDirection: "row", height: scale(32), alignItems: "center", borderBottomColor: "#EEEDF3", borderBottomWidth: 1, paddingLeft: scale(17) }}>
                    <Text style={{ fontSize: scale(13), color: '#A4A0AA' }}>订单号:</Text>
                    <Text style={{ fontSize: scale(13), color: '#000', letterSpacing: scale(0.28), marginLeft: scale(5) }}>{order.order_id}</Text>
                </View>
                {order.shop_list.map((shop, i) => (
                    <View key={i} >
                        <View style={{ flexDirection: "row", height: scale(35), alignItems: "center", borderBottomColor: "#EEEDF3", borderBottomWidth: 1, paddingLeft: scale(17) }}>
                            <Text style={{ fontSize: scale(13), color: '#6A617A' }}>{shop.shop_name}</Text>
                        </View>
                        {shop.commodity_list.map((good, ii) => (
                            <View key={ii} style={{ flexDirection: "row", alignItems: "center", borderColor: "#ECECEC", borderBottomWidth: 1, marginLeft: scale(17) }}>
                                <Image source={{ uri: good.commodity_url || 'https://misc.360buyimg.com/mtd/pc/common/img/blank.png' }} style={{ width: scale(80), height: scale(80) }} />
                                <View>
                                    <Text>{good.commodity_name}</Text>
                                    <Text>规格: {good.specifications_value}</Text>
                                </View>
                                <View>
                                    <Text>¥ {good.deduct_price}</Text>
                                    <Text>¥ {good.original_price}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center",marginBottom:scale(20),marginTop:scale(14),marginRight:scale(18) }}>
                    <Text>应付金额：</Text>
                    <Text>{order.order_total}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center",marginBottom:scale(13) }}>
                    <Touchable style={{ width: scale(100), height: scale(31),marginRight:scale(13),backgroundColor:"#ECE4F8",alignItems:"center",justifyContent:"center",borderRadius:scale(4)  }}>
                        <Text style={{color:"#781EFD"}}>取消订单</Text>
                    </Touchable>
                    <Touchable style={{ width: scale(100), height: scale(31),marginRight:scale(18),backgroundColor:"#781EFD",alignItems:"center",justifyContent:"center",borderRadius:scale(4) }}>
                        <Text style={{color:"#fff"}}>付款</Text>
                    </Touchable>
                </View>
            </View>
        )
    }
}

export default class PageUserOrder extends React.Component {
    static navigationOptions = {
        title: '我的订单',
        headerRight: <View />,
    }
    state = {
        type: 4,
        searchKey: "",
        list: []
    }
    componentDidMount() {
        const type = this.props.navigation.getParam('type') || 4
        this.onTab(type)
    }
    onTab(type) {
        this.setState({ type }, () => {
            this.fetchList()
        })
    }
    async fetchList() {
        var user = await getUserInfo()
        if(!user){
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
        this.setState({ list: res.data || [] })
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
                    ].map((tab,i) => (
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
                    data={this.state.list}
                    renderItem={({ item }) => <PayOrder data={item} key={item.order_id} />} />
            </View>
        );
    }
}