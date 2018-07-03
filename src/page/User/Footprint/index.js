import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { scale } from '../../../utils/dimension';

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
        title: '我的足迹',
        headerRight: <View />,
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView>
                    <View>
                        {CommodityData.map(props=>(
                            <CommodityItem {...props} />
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}