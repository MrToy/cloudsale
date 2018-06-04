import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { scale } from '../../utils/dimension';
import TouchableEx from '../TouchableEx';

export default class extends React.Component {
    static propTypes = {
        value:PropTypes.number,
        onChange:PropTypes.func
    }
    render() {
        var {value,onChange}=this.props
        return (
            <View style={{ flexDirection: "row", alignItems: "center", width: scale(107), height: scale(27.5), borderColor: "#C8BEDB", borderWidth: 1 }}>
                <TouchableEx onPress={value > 1?(() => onChange(value - 1 )):null}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Image source={require("../../images/minus_icon.png")} />
                    </View>
                </TouchableEx>
                <View style={{ width: scale(46), borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#C8BEDB", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Text>{value}</Text>
                </View>
                <TouchableEx onPress={() => onChange(value + 1 )}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Image source={require("../../images/plus_icon.png")} />
                    </View>
                </TouchableEx>
            </View>
        )
    }
}