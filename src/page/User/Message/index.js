import React from 'react';
import { Text, View, Image } from 'react-native';
import { scale } from '../../../utils/dimension';
import request from '../../../utils/request';


const TimeTip = ({ time }) => (
    <View style={{ alignItems: "center",marginBottom:scale(10) }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: scale(163), height: scale(24), backgroundColor: "rgba(120,30,253,0.75)", borderRadius: scale(8) }}>
            <Text style={{ fontSize: scale(12), color: "#FFFFFF" }}>{time}</Text>
        </View>
    </View>
)

const MessageBox = ({ tip, image, name, code }) => (
    <View style={{ alignItems: "center",marginBottom:scale(10) }}>
        <View style={{ width: scale(345), height: scale(118), paddingHorizontal: scale(14), paddingVertical: scale(9), backgroundColor: "#fff", borderRadius: scale(6), borderWidth: 1, borderColor: "#E6E6E6" }}>
            <Text style={{ fontSize: scale(13), lineHeight: scale(19), marginBottom: scale(4), color: "#9013FE" }}>{tip}</Text>
            <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: image }} style={{ width: scale(74), height: scale(74),borderColor:"#ECECEC",borderWidth:0.5 }} />
                <View style={{ flex: 1, marginLeft: scale(9) }}>
                    <Text style={{ fontSize: scale(13), lineHeight: scale(19), color: "#6A617A" }} numberOfLines={2}>{name}</Text>
                    <Text style={{ fontSize: scale(13),marginTop:scale(10), color: "#6A617A" }}>运单号: {code}</Text>
                </View>
            </View>
        </View>
    </View>
)

export default class PageUserMessage extends React.Component {
    static navigationOptions = {
        title: '我的消息',
        headerRight: <View />,
    }
    state={
        list:[]
    }
    async fetchList(){
        var user = UserStore.user
        if (!user) {
            this.props.navigation.navigate('UserLogin')
            return
        }
        var res=await request("https://www.bjzntq.com:8888/ShopMall/getMessageList/",{
            tokeninfo:user.tokeninfo
        })
        this.setState({ list:res.data||[] })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(10) }}>
                <TimeTip time="2018年7月13日" />
                {this.state.list.map(it=>(
                     <MessageBox
                        tip="订单派送中…"
                        name="珀莱雅 （PROYA ）海洋透皙白特惠装提亮肤色"
                        image="https://img12.360buyimg.com/mobilecms/s220x220_jfs/t20665/271/1729059806/78454/8fe47314/5b333b1cN3a338857.jpg"
                        code="17676888765" />
                ))}
            </View>
        )
    }
}