import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import TouchableEx from '../../components/TouchableEx';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    static propTypes = {
        type: PropTypes.oneOf(["list", "grid"]),
        name: PropTypes.string,
        imageUrl: PropTypes.string,
        navigation:PropTypes.object.isRequired
    }
    render() {
        var { type, name, imageUrl, onPress } = this.props
        type=type||"grid"
        return (
            <View style={{ width: scale(168), height: scale(234), backgroundColor: "#FAF5E2", padding: scale(11) }}>
                <TouchableEx>
                    <Image style={{ width: scale(146), height: scale(146), marginTop: scale(20) }} source={{ uri: imageUrl }} />
                </TouchableEx>
                <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: "#C49572" }}>{name}</Text>
            </View>
        );
    }
}