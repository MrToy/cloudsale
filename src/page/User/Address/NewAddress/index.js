import React from 'react';
import { Image, Text, View,TextInput,Alert } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../../utils/dimension';
import request from '../../../../utils/request'
import UserStore from '../../../../utils/user';
import Toast from 'react-native-root-toast';

const InputItem=({label,placeholder,rightItem,numberOfLines,value,onChangeText})=>(
    <View style={{backgroundColor:"#fff",flexDirection:"row",alignItems:"center",paddingLeft:scale(17),paddingRight:scale(26),paddingVertical:scale(12),marginBottom:1}}>
        <Text style={{width:scale(73),fontSize:scale(14),color:"#020202"}}>{label}</Text>
        <TextInput style={{flex:1}} placeholder={placeholder} onChangeText={onChangeText} value={value} underlineColorAndroid={false} />
        {rightItem}
    </View>
)


export default class PageUserNewAddress extends React.Component {
    static navigationOptions = ({navigation})=>({
        title: '新增地址',
        headerRight: (
            <Touchable style={{ marginRight: scale(14) }} onPress={navigation.getParam('onSave')}>
                <Text style={{ fontSize: scale(15), color: "#fff" }}>完成</Text>
            </Touchable>
        ),
    })
    state={
        name:null,
        phone:null,
        addr:null,
        detail:null,
        postcode:null,
    }
    constructor(props){
        super(props)
        this.props.navigation.setParams({onSave:this.onSave.bind(this)})
    }
    async onSave(){
        const {name,phone,addr,detail}=this.state
        if(!name||!phone||!addr||!detail){
            Alert.alert("请填写完整")
            return
        }
        var res=await request("https://www.bjzntq.com:8888/Account/addAddress/",{
            "tokeninfo":UserStore.user.tokeninfo,
            "user_id":UserStore.user.user_id,
            "isdefault":false,
            "recipients":name,
            "phone":phone,
            "detail":detail,
            "province":addr
        })
        Toast.show(res.message, {
			position: Toast.positions.CENTER
        })
        this.props.navigation.goBack()
        var callback = this.props.navigation.getParam('callback')
        if(callback){
            callback()
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(6) }}>
                <InputItem
                    label="联系人"
                    placeholder="名字"
                    value={this.state.name}
                    onChangeText={str=>this.setState({name:str})}
                    rightItem={<Image source={require('../../../../images/通讯录.png')} />} />
                <InputItem
                    label="手机号码"
                    placeholder="11位手机号"
                    value={this.state.phone}
                    onChangeText={str=>this.setState({phone:str})} />
                <InputItem
                    label="选择地址"
                    placeholder="地区信息"
                    value={this.state.addr}
                    onChangeText={str=>this.setState({addr:str})} 
                    rightItem={<Image source={require('../../../../images/定位2.png')} />} />
                <InputItem
                    mutil
                    label="详细地址"
                    placeholder="街道门牌信息"
                    value={this.state.detail}
                    onChangeText={str=>this.setState({detail:str})}  />
                {/* <InputItem
                    label="邮政编码"
                    placeholder="邮政编码"
                    value={this.state.postcode}
                    onChangeText={str=>this.setState({postcode:str})} /> */}
            </View>
        )
    }
}