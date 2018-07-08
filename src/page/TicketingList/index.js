import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { scale } from '../../utils/dimension';
import request from '../../utils/request'
import UserStore from '../../utils/user';

const OrderItem = ({ id, order_date, from, to, date, person, tel,idcard }) => (
    <View style={{ backgroundColor: "#fff", marginBottom: scale(8), paddingBottom: scale(13) }}>
        <View style={{ height: scale(32), borderColor: "#EEEDF3", borderBottomWidth: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: scale(17) }}>
            <Text style={{ fontSize: scale(13), color: "#A4A0AA" }}>订单号: </Text>
            <Text style={{ fontSize: scale(13), color: "#666", flex: 1 }}>{id}</Text>
            <Text style={{ fontSize: scale(13), color: "#6A607B" }}>{order_date}</Text>
        </View>
        <Text style={{ fontSize: scale(13), color: "#A4A0AA", marginVertical: scale(8), paddingHorizontal: scale(17) }}>用车信息:</Text>
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: scale(10) }}>
            <View style={{ width: scale(138), height: scale(91), backgroundColor: "#F7F7F7", justifyContent: "center", alignItems: "center",paddingHorizontal:scale(15) }}>
                <Image source={require('../../images/school.png')} />
                <Text style={{ fontSize: scale(13), color: "#6A617A", marginTop: scale(10),lineHeight:scale(18) }}>{from}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: scale(13), color: "#6A617A", marginBottom: scale(3) }}>{date}</Text>
                <Image source={require('../../images/goLine.png')} />
            </View>
            <View style={{ width: scale(138), height: scale(91), backgroundColor: "#F7F7F7", justifyContent: "center", alignItems: "center",paddingHorizontal:scale(15)  }}>
                <Image source={require('../../images/hometown.png')} />
                <Text style={{ fontSize: scale(13), color: "#6A617A", marginTop: scale(10),lineHeight:scale(18) }}>{to}</Text>
            </View>
        </View>
        <Text style={{ fontSize: scale(13), color: "#A4A0AA", marginVertical: scale(8), paddingHorizontal: scale(17) }}>乘客信息:</Text>
        <Text style={{ fontSize: scale(13), lineHeight: scale(18), color: "#6A607B", paddingHorizontal: scale(17),letterSpacing:scale(0.28) }}>联系人: {person}{idcard?`(${idcard})`:''}</Text>
        <Text style={{ fontSize: scale(13), lineHeight: scale(18), color: "#6A607B", paddingHorizontal: scale(17),letterSpacing:scale(0.28)  }}>联系电话: {tel}</Text>
    </View>
)

export default class extends React.Component {
    static navigationOptions = {
        title: '票务订单',
        headerRight: <View />,
    }
    state = {
        list: []
    }
    componentDidMount() {
        if (!UserStore.user) {
            this.props.navigation.navigate('UserLogin', {
                callback: () => {
                    this.fetchList()
                }
            })
            return
        }
        this.fetchList()
    }
    async fetchList() {
        var res = await request("https://www.bjzntq.com:8888/Ticket/getTicketOrderList/", {
            tokeninfo: UserStore.user.tokeninfo
        })
        this.setState({
            list: res.data
        })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <FlatList
                    data={this.state.list}
                    renderItem={({item}) => (
                        <OrderItem
                            id={item.id}
                            order_date={item.create_time}
                            from={item.departcher}
                            to={item.destination}
                            date={item.departure_date}
                            person={item.contacts}
                            tel={item.phone}
                            idcard={item.idcard}  />
                    )} />
            </View>
        );
    }
}