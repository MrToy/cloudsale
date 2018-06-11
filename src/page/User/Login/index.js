import React from 'react';
import { Text, View, TouchableWithoutFeedback, FlatList, Image, TextInput } from 'react-native';
import { getUserInfo } from '../../../components/User';
import { scale } from '../../../utils/dimension';
import SearchButton from '../../Main/SearchButton';
import Touchable from 'react-native-platform-touchable'


export default class PageUserOrder extends React.Component {
    static navigationOptions = {
        title: '登录',
        headerRight: <View />,
    }
    state = {
        user: "",
        pass: ""
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(30), paddingLeft: scale(16), paddingRight: scale(16), paddingBottom: scale(20) }}>
                <View style={{ height: scale(42)}}>
                    <TextInput value={this.state.user} onChangeText={str => this.setState({ user: str })} />
                </View>
                <View style={{ height: scale(42)}}>
                    <TextInput value={this.state.user} onChangeText={str => this.setState({ user: str })} />
                </View>
            </View>
        )
    }
}