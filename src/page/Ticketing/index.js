import React from 'react';
import { View } from 'react-native';

export default class extends React.Component {
    static navigationOptions = {
        title: '旅游票务',
        headerRight: <View />,
    }
    state = {
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>

            </View>
        );
    }
}