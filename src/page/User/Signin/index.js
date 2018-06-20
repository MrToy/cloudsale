import React from 'react';
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../utils/dimension';
import request from '../../../utils/request';
import TextInput from '../Login/TextInput';
import {setUserInfo} from '../../../utils/user'

const styles = StyleSheet.create({
    inputLabel: {
        marginLeft: scale(16), width: scale(79), fontSize: scale(14), color: '#6A617A'
    },
})


export default class PageUserSignin extends React.Component {
    static navigationOptions = {
        title: '注册',
        headerRight: <View />,
    }
    state = {
        user: "",
        pass: "",
        pass2: "",
        phone: "",
        code: "",
        countdown: 0
    }
    async signin() {
        try {
            var res = await request("https://www.bjzntq.com:8888/Account/appUserRegister/", {
                "accountname": this.state.user,
                "password": this.state.pass,
                "phone":this.state.phone,
                "identifycode":this.state.code
            })
        } catch (err) {
            Alert.alert(err.message)
            return
        }
        await setUserInfo(res.data)
        Alert.alert(res.message,null,[
            {text: 'OK', onPress: () => {
                this.props.navigation.goBack()
            }}
        ])
    }
    async getCode() {
        var phone = this.state.phone
        try {
            if (!phone.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
                throw new Error("请输入合法的手机号")
            }
            var res = await request("https://www.bjzntq.com:8888/Account/getAppIdentifyCode/", {
                phone
            })
        } catch (err) {
            Alert.alert(err.message)
            return
        }
        this.setState({ code: "9999" })
        this.setState({ countdown: 60 })
        this._timer = setInterval(() => {
            if (this.state.countdown < 1) {
                clearInterval(this._timer)
            } else {
                this.setState({ countdown: this.state.countdown - 1 })
            }
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this._timer)
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(30), paddingLeft: scale(16), paddingRight: scale(16), paddingBottom: scale(20) }}>
                <TextInput
                    value={this.state.user} onChangeText={str => this.setState({ user: str })} placeholder="您的用户名"
                    leftComponent={<Text style={styles.inputLabel}>用  户  名</Text>} />
                <TextInput
                    value={this.state.pass} onChangeText={str => this.setState({ pass: str })} placeholder="建议使用至少两种字符组合" secureTextEntry
                    leftComponent={<Text style={[styles.inputLabel, { letterSpacing: scale(1.48) }]}>设置密码</Text>} />
                <TextInput
                    value={this.state.pass2} onChangeText={str => this.setState({ pass2: str })} placeholder="请再次输入密码" secureTextEntry
                    leftComponent={<Text style={[styles.inputLabel, { letterSpacing: scale(1.48) }]}>确认密码</Text>} />
                <TextInput
                    value={this.state.phone} onChangeText={str => this.setState({ phone: str })} placeholder="建议使用常用手机"
                    leftComponent={(
                        <View style={{ height: "100%", justifyContent: "center", borderColor: "#C8BEDB", borderRightWidth: 1 }}>
                            <Text style={styles.inputLabel}>中国 +86</Text>
                        </View>
                    )} />
                <TextInput
                    value={this.state.code} onChangeText={str => this.setState({ code: str })} placeholder="请输入验证码"
                    leftComponent={<Text style={styles.inputLabel}>手机验证码</Text>}
                    rightComponent={this.state.countdown > 0 ? (
                        <View style={{ height: scale(30), justifyContent: "center", alignItems: "center", backgroundColor: "#F4F4F4", marginRight: scale(4), paddingLeft: scale(5), paddingRight: scale(5) }}>
                            <Text style={{ fontSize: scale(14), color: "#6A617A" }}>{this.state.countdown}s后重新发送</Text>
                        </View>
                    ) : (
                            <Touchable style={{ height: scale(30), justifyContent: "center", alignItems: "center", backgroundColor: "#F4F4F4", marginRight: scale(4), paddingLeft: scale(5), paddingRight: scale(5) }} onPress={this.getCode.bind(this)}>
                                <View>
                                    <Text style={{ fontSize: scale(14), color: "#6A617A" }}>获取验证码</Text>
                                </View>
                            </Touchable>
                        )} />
                <Touchable onPress={this.signin.bind(this)} style={{ height: scale(50), borderRadius: scale(25), backgroundColor: "#781EFD", alignItems: "center", justifyContent: "center", marginBottom: scale(16) }}>
                    <View>
                        <Text style={{ color: "#fff", fontSize: scale(15) }}>立即注册</Text>
                    </View>
                </Touchable>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                        <View>
                            <Text style={{ fontSize: scale(14), lineHeight: scale(20), color: '#6A617A' }}>使用已有账号登录</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}