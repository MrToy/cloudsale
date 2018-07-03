import React from 'react';
import { Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../utils/dimension';
const addrData = [
    { name: "寒桥", addr: "北京市朝阳区南湖中园一区120号楼9-101", id: 1 },
    { name: "寒桥", addr: "北京市朝阳区南湖中园一区120号楼9-101", id: 2 },
    { name: "寒桥", addr: "北京市朝阳区南湖中园一区120号楼9-101", id: 3 },
]

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
    static navigationOptions = ({navigation})=>({
        title: '我的地址',
        headerRight: (
            <Touchable style={{ marginRight: scale(14) }} onPress={()=>navigation.goBack()}>
                <Text style={{ fontSize: scale(15), color: "#fff" }}>完成</Text>
            </Touchable>
        ),
    })
    state = {
        current: 1
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(6) }}>
                {addrData.map(it => (
                    <AddrItem
                        {...it}
                        selected={this.state.current == it.id}
                        onSelect={()=>this.setState({current:it.id})}
                        onEdit={()=> this.props.navigation.navigate('UserEditAddress')} />
                ))}
                <Touchable onPress={() => this.props.navigation.navigate('UserNewAddress')}>
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