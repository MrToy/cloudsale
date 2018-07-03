import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { scale } from '../../../utils/dimension';
import Touchable from 'react-native-platform-touchable'

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

const CommodityItem = ({ image, name, spec, price, deduct_price }) => (
    <View style={{ flexDirection: "row",height:scale(94),alignItems:"center",backgroundColor:"#fff",marginTop:scale(5) }}>
        <Image source={{ uri: image }} style={{ width: scale(80), height: scale(80), borderColor: "#ECECEC", borderWidth: 0.5 }} />
        <View style={{ flex: 1, marginLeft: scale(9) }}>
            <Text style={{ fontSize: scale(12), lineHeight: scale(16), color: "#6A617A" }} numberOfLines={2}>{name}</Text>
            <Text style={{ fontSize: scale(11), lineHeight: scale(19), color: "#989898" }}>规格: {spec}</Text>
            <View style={{flexDirection:"row"}}>
                <Text style={{ fontSize: scale(13), lineHeight: scale(19), color: "#E339D3"}}>¥{price}</Text>
                <Text style={{ fontSize: scale(13), lineHeight: scale(19), color: "#A1A1A1",marginLeft:scale(30),textDecorationLine:"line-through" }}>¥{deduct_price}</Text>
            </View>
        </View>
    </View>
)

const CommodityData = [
    {
        image: "https://img12.360buyimg.com/mobilecms/s220x220_jfs/t20665/271/1729059806/78454/8fe47314/5b333b1cN3a338857.jpg",
        name: "三只松鼠坚果炒货零食每日坚果炭烧腰果, 每日坚果90g/袋",
        spec: "炭烧腰果90g",
        price: 99,
        deduct_price: 89
    },
    {
        image: "https://img12.360buyimg.com/mobilecms/s220x220_jfs/t20665/271/1729059806/78454/8fe47314/5b333b1cN3a338857.jpg",
        name: "三只松鼠坚果炒货零食每日坚果炭烧腰果, 每日坚果90g/袋",
        spec: "炭烧腰果90g",
        price: 99,
        deduct_price: 89
    },
    {
        image: "https://img12.360buyimg.com/mobilecms/s220x220_jfs/t20665/271/1729059806/78454/8fe47314/5b333b1cN3a338857.jpg",
        name: "三只松鼠坚果炒货零食每日坚果炭烧腰果, 每日坚果90g/袋",
        spec: "炭烧腰果90g",
        price: 99,
        deduct_price: 89
    },
    {
        image: "https://img12.360buyimg.com/mobilecms/s220x220_jfs/t20665/271/1729059806/78454/8fe47314/5b333b1cN3a338857.jpg",
        name: "三只松鼠坚果炒货零食每日坚果炭烧腰果, 每日坚果90g/袋",
        spec: "炭烧腰果90g",
        price: 99,
        deduct_price: 89
    }
]

export default class PageUserFavor extends React.Component {
    static navigationOptions = {
        title: '我的收藏',
        headerRight: <View />,
    }
    state = {
        tab: 0
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
                <FlatList
                    data={CommodityData}
                    renderItem={({ item }) => <CommodityItem {...item} />} />
            </View>
        )
    }
}