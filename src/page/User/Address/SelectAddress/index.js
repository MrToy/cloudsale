import React from 'react';
import { Image, Text, View,Alert } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../../utils/dimension';
import request from '../../../../utils/request'
import UserStore from '../../../../utils/user';

const AddrItem = ({ name, addr, selected, onSelect,onEdit }) => (
    <Touchable onPress={onSelect}>
        <View style={{ flexDirection: "row", alignItems: "center", height: scale(52), backgroundColor: "#fff", marginBottom: scale(1), paddingRight: scale(15) }}>
            <View style={{ width: scale(47), alignItems: "center" }}>
                {selected ? (
                    <Image source={require('../../../../images/Path5.png')} />
                ) : null}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{fontSize:scale(14),lineHeight:scale(20),color:"#000",fontWeight:"600"}}>{name}</Text>
                <Text style={{fontSize:scale(13),lineHeight:scale(19),color:"#878787"}}>{addr}</Text>
            </View>
            <Touchable onPress={onEdit}>
                <Image source={require('../../../../images/info.png')} />
            </Touchable>
        </View>
    </Touchable>
)

export default class PageSelectAddress extends React.Component {
    static navigationOptions = ({navigation})=>({
        title: '我的地址',
        headerRight: (
            <Touchable style={{ marginRight: scale(14) }} onPress={navigation.getParam('onSave')}>
                <Text style={{ fontSize: scale(15), color: "#fff" }}>完成</Text>
            </Touchable>
        ),
    })
    state = {
        list:[],
        current:0
    }
    constructor(props){
        super(props)
        this.props.navigation.setParams({onSave:this.onSave.bind(this)})
    }
    onSave(){
        const onSelect = this.props.navigation.getParam('onSelect')        
        var addr=this.state.list[this.state.current]
        if(!addr){
            Alert.alert("请选择一个地址")
            return
        }
        this.props.navigation.goBack()
        if(onSelect){
            onSelect(addr)
        }
    }
    componentDidMount(){
        this.fetchList()
    }
    async fetchList(){
        var res=await request("https://www.bjzntq.com:8888/Account/getAddressList/",{
            tokeninfo:UserStore.user.tokeninfo
        })
        var list=res.data||[]
        const currentId = this.props.navigation.getParam('currentId')
        var index=list.findIndex(it=>it.id==currentId)
        this.setState({
            list,
            current:index==-1?0:index
        })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(6) }}>
                {this.state.list.map((it,i) => (
                    <AddrItem
                        key={it.id}
                        name={it.recipients}
                        addr={it.detail}
                        selected={this.state.current==i}
                        onSelect={()=>this.setState({current:i})}
                        onEdit={()=> this.props.navigation.navigate('UserEditAddress',{callback:this.fetchList.bind(this),addr:it})} />
                ))}
                <Touchable onPress={() => this.props.navigation.navigate('UserNewAddress',{callback:this.fetchList.bind(this)})}>
                    <View style={{ height: scale(41), backgroundColor: "#fff", flexDirection: "row", alignItems: "center", paddingHorizontal: scale(20) }}>
                        <Image source={require("../../../../images/加.png")} />
                        <Text style={{ fontSize: scale(16), color: "#6B6B6B", marginLeft: scale(15), flex: 1 }}>新增地址</Text>
                        <Image source={require("../../../../images/Path3.png")} />
                    </View>
                </Touchable>
            </View>
        )
    }
}