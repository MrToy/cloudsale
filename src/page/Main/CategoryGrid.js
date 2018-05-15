import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import TouchableEx from '../../components/TouchableEx';
import { scale } from '../../utils/dimension';
import ArrowItem from './ArrowItem';

export default class extends React.Component {
    static propTypes = {
        style:PropTypes.object,
        data:PropTypes.object,
        navigation:PropTypes.object,
    }
    render() {
        var { data,style,navigation } = this.props
        return (
            <View style={[{backgroundColor: data.category_background, padding: scale(11) },style]}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableEx>
                        <View style={{ width: scale(112), height: scale(149) }}>
                            <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: data.category_title_color,marginBottom:scale(5) }}>{data.category_name}</Text>
                            <ArrowItem text="进入频道" />
                            <Image style={{ width: scale(103), height: scale(87), marginTop: scale(12) }} source={{ uri: data.category_icon }} />
                        </View>
                    </TouchableEx>
                    {data.subcategoryList.map((it, i) => (
                        <View key={i} style={{width:scale(112),height:scale(149),marginLeft:scale(7),backgroundColor:"#fff",alignItems:"center"}}>
                            <Text style={{fontSize:scale(13),lineHeight:scale(18),color:"#6A607B",marginTop:scale(8)}}>{it.subcategory_name}</Text>
                            <Text style={{fontSize:scale(11),lineHeight:scale(16),color:"#E339D3"}}>{it.subcategory_description}</Text>
                            <Image style={{ width: scale(85), height: scale(85), marginTop: scale(10) }} source={{ uri: it.subcategory_image }} />
                        </View>
                    ))}
                </View>
                <View style={{ flexDirection: 'row',marginTop:scale(10) }}>
                    {data.commodityList.map((it, i) => (
                        <TouchableEx key={i} onPress={()=>navigation.navigate('Detail',{id:it.commodity_id})}>
                            <View style={{width:scale(112),height:scale(71),marginRight:scale(7),flexDirection: 'row',alignItems:"center",padding:scale(3),backgroundColor:"#fff"}}>
                                <View>
                                    <Text style={{width:scale(45),color:"#6A607B",fontSize:scale(12)}} numberOfLines={2}>{it.name}</Text>
                                    <Text style={{fontSize:scale(11),color:"#E339D3"}}>¥{it.original_price}</Text>
                                </View>
                                <Image style={{ width: scale(59), height: scale(59) }} source={{ uri: it.image_url }} />
                            </View>
                        </TouchableEx>
                    ))}
                </View>
            </View>
        );
    }
}