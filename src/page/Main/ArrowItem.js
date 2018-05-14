import PropTypes from 'prop-types';
import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    static propTypes = {
        color: PropTypes.string,
        text: PropTypes.string,
        style:PropTypes.object
    }
    render() {
        const { text, color,style } = this.props
        return (
            <View style={[{ flexDirection: 'row', alignItems: "center", backgroundColor: color||"#781EFD", borderRadius: scale(10),height:scale(17), alignSelf:"flex-start" },style]}>
                <Text style={{ fontSize: scale(8), marginLeft: scale(7), color: "#F9F9F9" }}>{text}</Text>
                <Image style={{ marginLeft: scale(3),marginRight:scale(8) }} source={require('../../images/flag-right-arrow.png')} />
            </View>
        );
    }
}