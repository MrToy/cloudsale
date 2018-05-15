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
                        <View key={i} style={{ width: scale(168), backgroundColor: "#FAF5E2", padding: scale(11) }}>
                            <TouchableEx>
                                <Image style={{ width: scale(146), height: scale(146), marginTop: scale(20) }} source={{ uri: it.image_url }} />
                            </TouchableEx>
                            <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: "#C49572" }}>{it.name}</Text>
                            <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: "#C49572" }}>¥{it.deduct_price}</Text>
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