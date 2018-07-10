import React from 'react';
import { Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../utils/dimension';
import request from '../../../utils/request'
import UserStore from '../../../utils/user';

const AddrItem = ({ name, addr, selected, onSelect,onEdit }) => (
    <Touchable onPress={onSelect}>
        <View style={{ flexDirection: "row", alignItems: "center", height: scale(52), backgroundColor: "#fff", marginBottom: scale(1), paddingRight: scale(15) }}>
            <View style={{ width: scale(47), alignItems: "center" }}>
                {selected ? (
                    <Image source={require('../../../images/Path5.png')} />
                ) : null}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{fontSize:scale(14),lineHeight:scale(20),color:"#000",fontWeight:"600"}}>{name}</Text>
                <Text style={{fontSize:scale(13),lineHeight:scale(19),color:"#878787"}}>{addr}</Text>
            </View>
            <Touchable onPress={onEdit}>
                <Image source={require('../../../images/info.png')} />
            </Touchable>
        </View>
    </Touchable>
)

export default class PageUserAddress extends React.Component {
    static navigationOptions = {
        title: '我的地址',
        headerRight: <View />,
    }
    state = {
        list:[]
    }
    componentDidMount(){
        this.fetchList()
    }
    async fetchList(){
        var res=await request("https://www.bjzntq.com:8888/Account/getAddressList/",{
            tokeninfo:UserStore.user.tokeninfo
        })
        this.setState({list:res.data||[]})
    }
    async setDefault(id){
        await request("https://www.bjzntq.com:8888/Account/setDefaultAddress/",{
            tokeninfo:UserStore.user.tokeninfo,
            address_id:id
        })
        this.fetchList()
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(6) }}>
                {this.state.list.map(it => (
                    <AddrItem
                        key={it.id}
                        name={it.recipients}
                        addr={it.detail}
                        selected={it.isdefault}
                        onSelect={()=>this.setDefault(it.id)}
                        onEdit={()=> this.props.navigation.navigate('UserEditAddress',{callback:this.fetchList.bind(this),addr:it})} />
                ))}
                <Touchable onPress={() => this.props.navigation.navigate('UserNewAddress',{callback:this.fetchList.bind(this)})}>
                    <View style={{ height: scale(41), backgroundColor: "#fff", flexDirection: "row", alignItems: "center", paddingHorizontal: scale(20) }}>
                        <Image source={require("../../../images/加.png")} />
                        <Text style={{ fontSize: scale(16), color: "#6B6B6B", marginLeft: scale(15), flex: 1 }}>新增地址</Text>
                        <Image source={require("../../../images/Path3.png")} />
                    </View>
                </Touchable>
            </View>
        )
    }
}