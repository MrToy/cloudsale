import React from 'react';
import { Alert, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../utils/dimension';
import TextInput from './TextInput';
import { setUserInfo } from '../../../utils/user'
import request from '../../../utils/request';

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
        try {
            var res = await request("https://www.bjzntq.com:8888/Account/appUserLogin/", {
                "accountname": this.state.user,
                "password": this.state.pass
            })
        } catch (err) {
            Alert.alert(err.message)
            return
        }
        await setUserInfo(res.data)
        Alert.alert(res.message, null, [
            {
                text: 'OK', onPress: () => {
                    this.props.navigation.goBack()
                }
            }
        ])
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
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: scale(68) }}>
                    <TouchableWithoutFeedback>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: scale(14), color: '#6A617A' }}>忘记密码 ?</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('UserSignin')}>
                        <View>
                            <Text style={{ fontSize: scale(14), color: '#6A617A' }}>立即注册</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {/* <View style={{ flexDirection: "row", alignItems: "center", marginBottom: scale(68) }}>
                    <View style={{ borderColor: "#C8BEDB", borderTopWidth: 1, flex: 1 }}></View>
                    <Text style={{ marginLeft: scale(23), marginRight: scale(23) }}>其他登录方式</Text>
                    <View style={{ borderColor: "#C8BEDB", borderTopWidth: 1, flex: 1 }}></View>
                </View> */}
            </View>
        )
    }
}