import React from 'react';
import { ScrollView, StyleSheet, View, Text,Image } from 'react-native';
import { scale } from '../../utils/dimension';


const OrderItem = ({ id, order_date, from, to, date, person, tel }) => (
    <View style={{ backgroundColor: "#fff", marginBottom: scale(8),paddingBottom:scale(13) }}>
        <View style={{ height: scale(32), borderColor: "#EEEDF3", borderBottomWidth: 1,flexDirection:"row",alignItems:"center",paddingHorizontal:scale(17) }}>
            <Text style={{fontSize:scale(13),color:"#A4A0AA"}}>订单号: </Text>
            <Text style={{fontSize:scale(13),color:"#666",flex:1}}>{id}</Text>
            <Text style={{fontSize:scale(13),color:"#6A607B"}}>2018年6月26日</Text>
        </View>
        <Text style={{fontSize:scale(13),color:"#A4A0AA",marginVertical:scale(8),paddingHorizontal:scale(17)}}>用车信息:</Text>
        <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:scale(10)}}>
            <View style={{width:scale(138),height:scale(91),backgroundColor:"#F7F7F7",justifyContent:"center",alignItems:"center"}}>
                <Image source={require('../../images/school.png')} />
                <Text style={{fontSize:scale(13),color:"#6A617A",marginTop:scale(10)}}>{from}</Text>
            </View>
            <View style={{flex:1,alignItems:"center"}}>
                <Text style={{fontSize:scale(13),color:"#6A617A",marginBottom:scale(3)}}>2018/6/30</Text>
                <Image source={require('../../images/goLine.png')} />
            </View>
            <View style={{width:scale(138),height:scale(91),backgroundColor:"#F7F7F7",justifyContent:"center",alignItems:"center"}}>
                <Image source={require('../../images/hometown.png')} />
                <Text style={{fontSize:scale(13),color:"#6A617A",marginTop:scale(10)}}>{to}</Text>
            </View>
        </View>
        <Text style={{fontSize:scale(13),color:"#A4A0AA",marginVertical:scale(8),paddingHorizontal:scale(17)}}>乘客信息:</Text>
        <Text style={{fontSize:scale(13),lineHeight:scale(18),color:"#6A607B",paddingHorizontal:scale(17)}}>联系人: 张三(31231231231231)</Text>
        <Text style={{fontSize:scale(13),lineHeight:scale(18),color:"#6A607B",paddingHorizontal:scale(17)}}>联系电话: 15612312312313</Text>
    </View>
)

export default class extends React.Component {
    static navigationOptions = {
        title: '票务订单',
        headerRight: <View />,
    }
    state = {
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView>
                    <OrderItem id="72312312312313" from="重庆大学" to="石家庄" />
                    <OrderItem id="72312312312313" from="重庆大学" to="石家庄" />
                    <OrderItem id="72312312312313" from="重庆大学" to="石家庄" />
                </ScrollView>
            </View>
        );
    }
}