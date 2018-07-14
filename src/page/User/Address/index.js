import React from 'react';
import { Image, Text, View, Alert } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../utils/dimension';
import request from '../../../utils/request'
import UserStore from '../../../utils/user';
import { SwipeRow } from 'react-native-swipe-list-view';
import Toast from 'react-native-root-toast';

const AddrItem = ({ name, addr, selected, onSelect, onEdit }) => (
    // <Touchable onPress={onSelect}>
    <View style={{ flexDirection: "row", alignItems: "center", height: scale(52), backgroundColor: "#fff", marginBottom: scale(1) }}>
        <View style={{ flex: 1, marginLeft: scale(25) }}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: scale(14), lineHeight: scale(20), color: "#000", fontWeight: "600" }}>{name}</Text>
                {selected ? (
                    <View style={{ backgroundColor: "#781EFD", marginLeft: scale(15), height: scale(18), paddingHorizontal: scale(10), borderRadius: scale(9), alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: scale(11), color: "#fff" }}>默认地址</Text>
                    </View>
                ) : null}
            </View>
            <Text style={{ fontSize: scale(13), lineHeight: scale(19), color: "#878787" }}>{addr}</Text>
        </View>
        <Touchable onPress={onEdit} style={{ height: "100%", justifyContent: "center", paddingHorizontal: scale(15) }}>
            <Image source={require('../../../images/info.png')} />
        </Touchable>
    </View>
    // </Touchable>
)

export default class PageUserAddress extends React.Component {
    static navigationOptions = {
        title: '我的地址',
        headerRight: <View />,
    }
    state = {
        list: [],
        opened: null
    }
    constructor(props) {
        super(props)
        this._rowMap = []
    }
    componentDidMount() {
        this.fetchList()
    }
    async fetchList() {
        var res = await request("https://www.bjzntq.com:8888/Account/getAddressList/", {
            tokeninfo: UserStore.user.tokeninfo
        })
        this.setState({ list: res.data || [] })
    }
    setDefault(i) {
        Alert.alert("将其设置为默认地址？", null, [
            { text: "取消" },
            {
                text: "确定", onPress: async () => {
                    var res=await request("https://www.bjzntq.com:8888/Account/setDefaultAddress/", {
                        tokeninfo: UserStore.user.tokeninfo,
                        address_id: this.state.list[i].id
                    })
                    Toast.show(res.message, {
                        position: Toast.positions.CENTER
                    })
                    var list=this.state.list.map(it=>({
                        ...it,
                        isdefault:false
                    }))
                    list[i].isdefault=true
                    this.setState({list})
                    this.closePreRow()
                }
            }
        ])
    }
    delAddr(i) {
        Alert.alert("确认删除?", null, [
            { text: "取消" },
            {
                text: "确定", onPress: async () => {
                    var res=await request("https://www.bjzntq.com:8888/Account/deleteAddress/", {
                        tokeninfo: UserStore.user.tokeninfo,
                        address_id: this.state.list[i].id
                    })
                    Toast.show(res.message, {
                        position: Toast.positions.CENTER
                    })
                    var list=[...this.state.list]
                    list.splice(i,1)
                    this.setState({list})
                    this.closePreRow()
                }
            }
        ])
    }
    closePreRow(){
        var opened = this._rowMap[this.state.opened]
        if (opened) {
            opened.closeRow()
        }
    }
    toggleRow(i) {
        if( i != this.state.opened){
            this.closePreRow()
        }
        this.setState({ opened: i })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(6) }}>
                {this.state.list.map((it, i) => (
                    <SwipeRow
                        rightOpenValue={scale(-150)}
                        disableRightSwipe
                        ref={c => this._rowMap[i] = c}
                        onRowOpen={() => this.toggleRow(i)}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", height: scale(52) }}>
                            <Touchable onPress={() => this.setDefault(i)}>
                                <View style={{ width: scale(75), height: "100%", backgroundColor: "#781EFD", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#fff", fontSize: scale(14) }}>设为默认</Text>
                                </View>
                            </Touchable>
                            <Touchable onPress={() => this.delAddr(i)}>
                                <View style={{ width: scale(75), height: "100%", backgroundColor: "#e35f51", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#fff", fontSize: scale(14) }}>删除</Text>
                                </View>
                            </Touchable>
                        </View>
                        <AddrItem
                            key={it.id}
                            name={it.recipients}
                            addr={it.detail}
                            selected={it.isdefault}
                            onSelect={() => this.setDefault(it.id)}
                            onEdit={() => this.props.navigation.navigate('UserEditAddress', { callback: this.fetchList.bind(this), addr: it })} />
                    </SwipeRow>
                ))}
                <Touchable onPress={() => this.props.navigation.navigate('UserNewAddress', { callback: this.fetchList.bind(this) })}>
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