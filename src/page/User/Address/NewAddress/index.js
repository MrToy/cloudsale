import React from 'react';
import { Image, Text, View,TextInput } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../../utils/dimension';

const InputItem=({label,placeholder,rightItem,numberOfLines})=>(
    <View style={{backgroundColor:"#fff",flexDirection:"row",alignItems:"center",paddingLeft:scale(17),paddingRight:scale(26),paddingVertical:scale(12),marginBottom:1}}>
        <Text style={{width:scale(73),fontSize:scale(14),color:"#020202"}}>{label}</Text>
        <TextInput style={{flex:1}} placeholder={placeholder} />
        {rightItem}
    </View>
)


export default class PageUserNewAddress extends React.Component {
    static navigationOptions = ({navigation})=>({
        title: '新增地址',
        headerRight: (
            <Touchable style={{ marginRight: scale(14) }} onPress={()=>navigation.goBack()}>
                <Text style={{ fontSize: scale(15), color: "#fff" }}>完成</Text>
            </Touchable>
        ),
    })
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(6) }}>
                <InputItem
                    label="联系人"
                    placeholder="名字"
                    rightItem={<Image source={require('../../../../images/通讯录.png')} />} />
                <InputItem
                    label="手机号码"
                    placeholder="11位手机号" />
                <InputItem
                    label="选择地址"
                    placeholder="地区信息"
                    rightItem={<Image source={require('../../../../images/定位2.png')} />} />
                <InputItem
                    mutil
                    label="详细地址"
                    placeholder="街道门牌信息" />
                <InputItem
                    label="邮政编码"
                    placeholder="邮政编码" />
            </View>
        )
    }
}