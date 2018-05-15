import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import TouchableEx from '../../components/TouchableEx';
import { scale } from '../../utils/dimension';
import { withNavigation } from 'react-navigation'

class CommodityList extends React.Component {
    static propTypes = {
        type: PropTypes.oneOf(["list", "grid"]),
        list: PropTypes.array
    }
    render() {
        var { type, list } = this.props
        type = type || "grid"
        if(type=='grid'){
            return (
                <View style={{flexWrap:"wrap",flexDirection:"row"}}>
                    {list.map((it, i) => (
                        <View key={i} style={{ width: scale(186), backgroundColor: "#fff",marginRight:i%2==0?scale(3):0,marginBottom:scale(3) }}>
                            <TouchableEx>
                                <Image style={{ width: scale(160), height: scale(160), marginTop: scale(22),marginLeft:scale(15),marginRight:scale(15),marginBottom:scale(13) }} source={{ uri: it.image_url }} />
                            </TouchableEx>
                            <Text numberOfLines={2} style={{ fontSize: scale(10), lineHeight: scale(14),height:scale(28), color: "#6A617A",margin:scale(8),marginBottom:0 }}>{it.name}</Text>
                            <View style={{flexDirection:"row",justifyContent:"space-between",margin:scale(6),height:scale(35),alignItems:"center"}}>
                                <Text style={{ fontSize: scale(13), lineHeight: scale(18), color: "#E339D3" }}>¥{it.deduct_price}</Text>
                                <TouchableEx>
                                    <Image style={{width:scale(30),height:scale(35),resizeMode:"contain"}} source={require("../../images/add_cart_icon.png")} />
                                </TouchableEx>
                            </View>
                        </View>
                    ))}
                </View>
            )
        }else{
            return (
                <View>
                    {list.map((it, i) => (
                        <View key={i} style={{ width: scale(168), backgroundColor: "#FAF5E2", marginBottom: scale(0.5) }}>
                            <TouchableEx>
                                <Image style={{ width: scale(146), height: scale(146), marginTop: scale(20) }} source={{ uri: it.image_url }} />
                            </TouchableEx>
                            <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: "#C49572" }}>{it.name}</Text>
                            <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: "#C49572" }}>¥{it.deduct_price}</Text>
                        </View>
                    ))}
                </View>
            )
        }
    }
}

export default withNavigation(CommodityList)