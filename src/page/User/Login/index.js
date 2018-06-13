import React from 'react';
import { Text, View, TouchableWithoutFeedback, FlatList, Image } from 'react-native';
import { getUserInfo } from '../../../components/User';
import { scale } from '../../../utils/dimension';
import SearchButton from '../../Main/SearchButton';
import Touchable from 'react-native-platform-touchable'
import Toast from 'react-native-root-toast'
import TextInput from './TextInput'

export default class PageUserLogin extends React.Component {
    static navigationOptions = {
        title: '登录',
        headerRight: <View />,
    }
    state = {
        user: "",
        pass: ""
    }
    async login() {
        var res = await fetch("https://www.bjzntq.com:8888/Account/appUserLogin/", {
            method: "POST",
            body: JSON.stringify({
                "accountname": this.state.user,
                "password": this.state.pass
            })
        }).then(res => res.json())
        if (res.result != 200) {
            Toast.show(res.message, {
                position: Toast.positions.CENTER
            })
            return
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(30), paddingLeft: scale(16), paddingRight: scale(16), paddingBottom: scale(20) }}>
                <TextInput
                    value={this.state.user} onChangeText={str => this.setState({ user: str })} placeholder="用户名/已验证手机号"
                    leftComponent={<Image style={{ width: scale(40), height: scale(40) }} source={require('../../../images/account_icon.png')} />} />
                <TextInput
                    value={this.state.pass} onChangeText={str => this.setState({ pass: str })} secureTextEntry placeholder="密码"
                    leftComponent={<Image style={{ width: scale(40), height: scale(40) }} source={require('../../../images/lock_icon.png')} />} />
                <Touchable onPress={this.login.bind(this)} style={{ height: scale(50), borderRadius: scale(25), backgroundColor: "#781EFD", alignItems: "center", justifyContent: "center", marginBottom: scale(16) }}>
                    <Text style={{ color: "#fff", fontSize: scale(15) }}>登录</Text>
                </Touchable>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableWithoutFeedback>
                        <Text style={{ fontSize: scale(14), color: '#6A617A',flex:1 }}>忘记密码 ?</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>this.props.navigation.replace('UserSignin')}>
                        <Text style={{ fontSize: scale(14), color: '#6A617A' }}>立即注册</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}