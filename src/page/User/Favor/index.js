import React from 'react';
import { Text, View, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { scale } from '../../../utils/dimension';
import Touchable from 'react-native-platform-touchable'
import request from '../../../utils/request'
import UserStore from '../../../utils/user';
import { withNavigation } from 'react-navigation';

const SwitchBar = ({ list, onTab, current }) => (
    <View style={{ height: scale(49), flexDirection: "row", backgroundColor: "#fff" }}>
        {list.map((tab, i) => (
            <Touchable key={i} onPress={() => onTab(tab.id)} style={{ height: "100%", flex: 1, paddingLeft: scale(10), paddingRight: scale(10) }}>
                <View style={[{ height: "100%", justifyContent: "center", alignItems: "center" }, tab.id == current && { borderBottomColor: "#E339D3", borderBottomWidth: scale(2), borderTopWidth: scale(2), borderTopColor: "transparent" }]}>
                    <Text style={[{ fontSize: scale(14), color: '#6A617A' }, tab.id == current && { color: "#E339D3" }]}>{tab.text}</Text>
                </View>
            </Touchable>
        ))}
    </View>
)

const CommodityItem = ({ id, image, name, spec, price, deduct_price, navigation }) => (
    <TouchableWithoutFeedback onPress={() => navigation.push('Detail', { id })}>
        <View style={{ flexDirection: "row", height: scale(94), alignItems: "center", backgroundColor: "#fff", marginTop: scale(5), paddingHorizontal: scale(17) }}>
            <Image source={{ uri: image }} style={{ width: scale(80), height: scale(80), borderColor: "#ECECEC", borderWidth: 0.5 }} />
            <View style={{ flex: 1, marginLeft: scale(9) }}>
                <Text style={{ fontSize: scale(12), lineHeight: scale(16), color: "#6A617A" }} numberOfLines={2}>{name}</Text>
                <Text style={{ fontSize: scale(11), lineHeight: scale(19), color: "#989898" }}>规格: {spec}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: scale(13), lineHeight: scale(19), color: "#E339D3" }}>¥{price}</Text>
                    <Text style={{ fontSize: scale(13), lineHeight: scale(19), color: "#A1A1A1", marginLeft: scale(30), textDecorationLine: "line-through" }}>¥{deduct_price}</Text>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
)


class CommodityList extends React.Component {
    state = {
        list: []
    }
    componentDidMount() {
        this.fetchList()
    }
    async fetchList() {
        var res = await request("https://www.xinyun.shop:8888/Commodity/getCollectCommodityList/", {
            tokeninfo: UserStore.user.tokeninfo
        })
        this.setState({ list: res.data || [] })
    }
    render() {
        return (
            <FlatList
                data={this.state.list}
                renderItem={({ item }) => (
                    <CommodityItem
                        navigation={this.props.navigation}
                        id={item.commodity_id}
                        image={item.image_url}
                        name={item.small_text}
                        spec={item.specification_value}
                        price={item.original_price}
                        deduct_price={item.deduct_price} />
                )} />
        )
    }
}

const ShopItem = ({ logo, address, shop_id, name,navigation }) => (
    <TouchableWithoutFeedback onPress={() => navigation.push('ShopDetail', { shopId: shop_id,shopName:name })}>
        <View style={{ flexDirection: "row", height: scale(94), alignItems: "center", backgroundColor: "#fff", marginTop: scale(5), paddingHorizontal: scale(17) }}>
            <Image source={{ uri: logo }} style={{ width: scale(80), height: scale(80), borderColor: "#ECECEC", borderWidth: 0.5 }} />
            <View style={{ flex: 1, marginLeft: scale(9) }}>
                <Text style={{ fontSize: scale(12), lineHeight: scale(16), color: "#6A617A" }} numberOfLines={2}>{name}</Text>
                <Text style={{ fontSize: scale(11), lineHeight: scale(19), color: "#989898" }}>{address}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
)


class ShopList extends React.Component {
    state = {
        list: []
    }
    componentDidMount() {
        this.fetchList()
    }
    async fetchList() {
        var res = await request("https://www.xinyun.shop:8888/ShopMall/getCollectShopList/", {
            tokeninfo: UserStore.user.tokeninfo
        })
        this.setState({ list: res.data || [] })
    }
    render() {
        return (
            <FlatList
                data={this.state.list}
                renderItem={({ item }) => (
                    <ShopItem {...item} navigation={this.props.navigation} />
                )} />
        )
    }
}


export default class PageUserFavor extends React.Component {
    static navigationOptions = {
        title: '我的收藏',
        headerRight: <View />,
    }
    state = {
        tab: 0,

    }
    render() {
        const list = [
            { text: "商品", id: 0 },
            { text: "店铺", id: 1 },
        ]
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <SwitchBar
                    list={list}
                    current={this.state.tab}
                    onTab={id => this.setState({ tab: id })} />
                {this.state.tab == 0 ? (
                    <CommodityList navigation={this.props.navigation} />
                ) : (
                        <ShopList navigation={this.props.navigation} />
                    )}
            </View>
        )
    }
}