import React from 'react';
import { Image, ScrollView, Text, View,TouchableWithoutFeedback } from 'react-native';
import { scale } from '../../../utils/dimension';
import { getFootprintList } from '../../../utils/footprint';


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

export default class PageUserFavor extends React.Component {
    static navigationOptions = {
        title: '我的足迹',
        headerRight: <View />,
    }
    state = {
        list: []
    }
    componentDidMount() {
        this.fetchList()
    }
    async fetchList() {
        var list = await getFootprintList()
        this.setState({ list })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView>
                    <View>
                        {this.state.list.map(item => (
                            <CommodityItem
                                key={item.id}
                                navigation={this.props.navigation}
                                id={item.id}
                                image={item.banner&&item.banner[0].image_url}
                                name={item.small_text}
                                spec={item.specification_value}
                                price={item.original_price}
                                deduct_price={item.deduct_price}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}