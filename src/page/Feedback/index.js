import React from 'react';
import { ScrollView, Text, TextInput, View,Alert } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Toast from 'react-native-root-toast';
import Checkbox from '../../components/Checkbox';
import { scale } from '../../utils/dimension';
import request from '../../utils/request';
import UserStore from '../../utils/user';

class ListMenuItem extends React.Component {
    render() {
        const { label, info, onSelect, isSelect } = this.props
        return (
            <View style={{ height: scale(46), backgroundColor: "#fff", flexDirection: "row", marginTop: 1, alignItems: "center", paddingLeft: scale(15), paddingRight: scale(30) }}>
                <Text style={{ color: "#6A617A", fontSize: scale(12) }}>{label}</Text>
                <Text style={{ color: "#A4A0AA", fontSize: scale(12), marginLeft: scale(27), flex: 1 }}>{info}</Text>
                <Checkbox value={isSelect} onChange={v => v && onSelect()} />
            </View>
        )
    }
}

export default class PageFeedback extends React.Component {
    static navigationOptions = {
        title: '意见反馈',
        headerRight: <View />,
    }
    state = {
        type: 0,
        phone: null,
        message: null
    }
    async onConfirm() {
        if(!this.state.message){
            Alert.alert("请输入您的意见")
            return
        }
        var user = UserStore.user
        if (!user) {
            this.props.navigation.navigate('UserLogin')
            return
        }
        var res = await request("https://www.xinyun.shop:8888/ShopMall/addFeedback/", {
            "message": this.state.message,
            "message_type": this.state.type,
            "phone":this.state.phone,
            "tokeninfo": user.tokeninfo,
        })
        Toast.show(res.message, {
            position: Toast.positions.CENTER
        })
    }
    render() {
        const { type } = this.state
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView>
                    <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15), color: "#6A617A" }}>问题类型</Text>
                    <ListMenuItem
                        label="功能异常"
                        info="不能正常使用现有功能"
                        isSelect={type == 0}
                        onSelect={() => this.setState({ type: 0 })} />
                    <ListMenuItem
                        label="使用建议"
                        info="用的不满意的地方都踢过来吧"
                        isSelect={type == 1}
                        onSelect={() => this.setState({ type: 1 })} />
                    <ListMenuItem
                        label="功能需求"
                        info="现有功能不能满足"
                        isSelect={type == 2}
                        onSelect={() => this.setState({ type: 2 })} />
                    <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15), color: "#6A617A" }}>详情描述</Text>
                    <View style={{ backgroundColor: "#fff" }}>
                        <View style={{height:scale(113),paddingHorizontal:scale(16),paddingVertical:scale(13)}}>
                            <TextInput
                                style={{ flex: 1, fontSize: scale(12) }}
                                value={this.state.message}
                                onChangeText={text => this.setState({ message: text })}
                                underlineColorAndroid='transparent'
                                maxLength={500}
                                multiline
                                placeholder="如果您对我们有什么建议、想法和期望，请告诉我们" />
                        </View>
                        <View style={{justifyContent:"flex-end",flexDirection:"row",paddingHorizontal:scale(13),paddingVertical:scale(5)}}>
                            <Text style={{color:"#A4A0AA",fontSize:scale(12),lineHeight:scale(17)}}>{this.state.message&&this.state.message.length}/500</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", height: scale(39), marginTop: 1, backgroundColor: "#fff",alignItems:"center",paddingHorizontal:scale(14) }}>
                        <Text style={{marginRight:scale(41),color:"#6A617A",fontSize:scale(12)}}>手机号</Text>
                        <TextInput
                            style={{ flex: 1, fontSize: scale(12)}}
                            value={this.state.phone}
                            onChangeText={text => this.setState({ phone: text })}
                            underlineColorAndroid='transparent'
                            placeholder="方便我们更快向您反馈哦~" />
                    </View>
                    <View style={{ paddingHorizontal: scale(14), marginTop: scale(15), marginBottom: scale(13) }}>
                        <Touchable onPress={() => this.onConfirm()} style={{ height: scale(40), backgroundColor: "#781EFD", borderRadius: scale(5), justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#fff", fontSize: scale(13) }}>提交</Text>
                        </Touchable>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: scale(13), color: "#A4A0AA" }}>官方客服热线：010-6787654</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}