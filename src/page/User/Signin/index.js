import React from 'react';
import { Text, View, TouchableWithoutFeedback, FlatList, Image,StyleSheet } from 'react-native';
import { getUserInfo } from '../../../components/User';
import { scale } from '../../../utils/dimension';
import SearchButton from '../../Main/SearchButton';
import Touchable from 'react-native-platform-touchable'
import Toast from 'react-native-root-toast'
import TextInput from '../Login/TextInput'


const styles = StyleSheet.create({
    inputLabel: {
        marginLeft:scale(16),width:scale(79),fontSize:scale(14),color:'#6A617A'
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
        pass2:"",
        phone:"",
        code:""
    }
    async signin() {
        var res = await fetch("https://www.bjzntq.com:8888/Account/appUserRegister/", {
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
                    value={this.state.user} onChangeText={str => this.setState({ user: str })} placeholder="您的用户名"
                    leftComponent={<Text style={styles.inputLabel}>用  户  名</Text>} />
                <TextInput
                    value={this.state.pass} onChangeText={str => this.setState({ pass: str })} placeholder="建议使用至少两种字符组合" secureTextEntry
                    leftComponent={<Text style={[styles.inputLabel,{letterSpacing:scale(1.48)}]}>设置密码</Text>} />
                <TextInput
                    value={this.state.pass2} onChangeText={str => this.setState({ pass2: str })} placeholder="请再次输入密码" secureTextEntry
                    leftComponent={<Text style={[styles.inputLabel,{letterSpacing:scale(1.48)}]}>确认密码</Text>} />
                <TextInput
                    value={this.state.phone} onChangeText={str => this.setState({ phone: str })} placeholder="建议使用常用手机"
                    leftComponent={(
                        <View style={{height:"100%",justifyContent:"center",borderColor:"#C8BEDB",borderRightWidth:1}}>
                            <Text style={styles.inputLabel}>中国 +86</Text>
                        </View>
                    )} />
                <TextInput
                    value={this.state.code} onChangeText={str => this.setState({ code: str })} placeholder="请输入验证码"
                    leftComponent={<Text style={styles.inputLabel}>手机验证码</Text>}
                    rightComponent={(
                        <Touchable style={{width:scale(84),height:scale(30),justifyContent:"center",alignItems:"center",backgroundColor:"#F4F4F4",marginRight:scale(4)}}>
                            <Text style={{fontSize:scale(14),color:"#6A617A"}}>获取验证码</Text>
                        </Touchable>
                    )} />
                <Touchable onPress={this.signin.bind(this)} style={{ height: scale(50), borderRadius: scale(25), backgroundColor: "#781EFD", alignItems: "center", justifyContent: "center", marginBottom: scale(16) }}>
                    <Text style={{ color: "#fff", fontSize: scale(15) }}>立即注册</Text>
                </Touchable>
                <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"flex-end" }}>
                    <TouchableWithoutFeedback onPress={()=>this.props.navigation.goBack()}>
                        <Text style={{ fontSize: scale(14),lineHeight:scale(20), color: '#6A617A'}}>使用已有账号登录</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}