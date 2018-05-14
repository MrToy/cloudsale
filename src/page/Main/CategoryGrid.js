import React from 'react';
import { Image, Text, View } from 'react-native';
import TouchableEx from '../../components/TouchableEx';
import { scale } from '../../utils/dimension';
import ArrowItem from './ArrowItem'

export default class extends React.Component {
    render() {
        var { data } = this.props
        return (
            <View style={{backgroundColor: data.category_background }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableEx>
                        <View style={{ width: scale(168), height: scale(234), backgroundColor: "#FAF5E2", padding: scale(11) }}>
                            <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: data.category_title_color }}>{data.category_name}</Text>
                            <ArrowItem text="进入频道" />
                            <Image style={{ width: scale(146), height: scale(146), marginTop: scale(20) }} source={{ uri: data.category_icon }} />
                        </View>
                    </TouchableEx>
                    {data.subcategoryList.map((it, i) => (
                        <View key={i}>
                            <Text>{it.subcategory_name}</Text>
                            <Text>{it.subcategory_description}</Text>
                            <Image style={{ width: scale(146), height: scale(146), marginTop: scale(20) }} source={{ uri: it.subcategory_image }} />
                        </View>
                    ))}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {data.commodityList.map((it, i) => (
                        <View key={i}>
                            <Text>{it.name}</Text>
                            <Text>¥{it.original_price}</Text>
                            <Image style={{ width: scale(146), height: scale(146), marginTop: scale(20) }} source={{ uri: it.image_url }} />
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}