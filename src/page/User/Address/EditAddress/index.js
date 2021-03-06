import React from 'react';
import { Image, Text, View,TextInput,Alert } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../../utils/dimension';
import request from '../../../../utils/request';
import Toast from 'react-native-root-toast';
import UserStore from '../../../../utils/user';

const InputItem=({label,placeholder,rightItem,numberOfLines,value,onChangeText})=>(
    <View style={{backgroundColor:"#fff",flexDirection:"row",alignItems:"center",paddingLeft:scale(17),paddingRight:scale(26),paddingVertical:scale(12),marginBottom:1}}>
        <Text style={{width:scale(73),fontSize:scale(14),color:"#020202"}}>{label}</Text>
        <TextInput style={{flex:1}} placeholder={placeholder} onChangeText={onChangeText} value={value} underlineColorAndroid="transparent" />
        {rightItem}
    </View>
)



export default class PageUserEditAddress extends React.Component {
    static navigationOptions = ({navigation})=>({
        title: '修改地址',
        headerRight: (
            <Touchable style={{ marginRight: scale(14) }} onPress={navigation.getParam('onSave')}>
                <Text style={{ fontSize: scale(15), color: "#fff" }}>完成</Text>
            </Touchable>
        ),
    })
    state={
        addr:{}
    }
    constructor(props){
        super(props)
        this.props.navigation.setParams({onSave:this.onSave.bind(this)})
    }
    componentDidMount(){
        const addr = this.props.navigation.getParam('addr',{})
        this.setState({addr})
    }
    async onSave(){
        const {recipients,county,area,province,phone,detail,municipality,id}=this.state.addr
        if(!recipients||!phone||!province||!detail){
            Alert.alert("请填写完整")
            return
        }
        var res=await request("https://www.xinyun.shop:8888/Account/updateAddress/",{
            tokeninfo:UserStore.user.tokeninfo,
            address_id:id,
            recipients,county,area,province,phone,detail,municipality
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
    setAddr(data){
        this.setState({addr:{
            ...this.state.addr,
            ...data
        }})
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(6) }}>
                <InputItem
                    label="联系人"
                    placeholder="名字"
                    value={this.state.addr.recipients}
                    onChangeText={str=>this.setAddr({recipients:str})}
                    rightItem={<Image source={require('../../../../images/contact.png')} />} />
                <InputItem
                    label="手机号码"
                    placeholder="11位手机号"
                    value={this.state.addr.phone}
                    onChangeText={str=>this.setAddr({phone:str})} />
                <InputItem
                    label="选择地址"
                    placeholder="地区信息"
                    value={this.state.addr.province}
                    onChangeText={str=>this.setAddr({province:str})}
                    rightItem={<Image source={require('../../../../images/local2.png')} />} />
                <InputItem
                    mutil
                    label="详细地址"
                    value={this.state.addr.detail}
                    onChangeText={str=>this.setAddr({detail:str})}
                    placeholder="街道门牌信息" />
                {/* <InputItem
                    label="邮政编码"
                    placeholder="邮政编码"
                    value={this.state.addr.postcode}
                    onChangeText={str=>this.setAddr({postcode:str})} /> */}
            </View>
        )
    }
}