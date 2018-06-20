import React from 'react';
import { Image, TextInput, View } from 'react-native';
import { scale } from '../../../utils/dimension';

export default class PageUserLogin extends React.Component {
    render() {
        return (
            <View style={{ height: scale(42), flexDirection: "row", alignItems: "center", borderColor: '#C8BEDB', borderWidth: 1, marginBottom: scale(26), backgroundColor: "#fff" }}>
                {this.props.leftComponent}
                <TextInput style={{ flex: 1, padding: scale(8), fontSize: scale(15) }} underlineColorAndroid='transparent' {...this.props} />
                {this.props.rightComponent}
            </View>
        )
    }
}