import React from 'react';
import { View, Image, Text, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../utils/dimension';
import request from '../../utils/request'
import Picker from 'react-native-picker';
import UserStore from '../../utils/user';
import PayModal from '../../components/PayModal'
import {alipayByInfo,wechatByInfo} from '../../utils/pay'
import {StackActions,NavigationActions} from 'react-navigation'

const styles = StyleSheet.create({
    title: { fontSize: scale(17), color: "#6A617A", lineHeight: scale(24), marginBottom: scale(3) },
    inputBox: { height: scale(42), borderColor: "#C8BEDB", borderWidth: 1, flexDirection: "row", alignItems: "center", padding: scale(5), marginBottom: scale(7) },
    inputText: { fontSize: scale(14), color: "#A5A5A5" },
    labelText: { fontSize: scale(13), color: "#6A617A", marginLeft: scale(5) },
    textInput: { fontSize: scale(14), flex: 1, height: scale(42) }
})

const usage = `注意事项：
1、务必准确填写相关信息，避免耽误您的行程。
2、请准确选择预计出发时间，并至少提前一天订购车票；我们将优先安排预购票用户乘车，当日临时购票可能导致无法准点出发。
3、我们会提前一天将准确车辆班次信息发送至您的手机，方便您安排行程
4、考虑道路交通因素，请合理安排出发时间
5、如有任何问题请联系：15102346835
`

class SelectInput extends React.Component {
    openSelects() {
        const { selects, onChange, value } = this.props
        Picker.init({
            pickerTextEllipsisLen:18,
            pickerConfirmBtnText: "确定",
            pickerCancelBtnText: "取消",
            pickerTitleText: "",
            pickerConfirmBtnColor: [120, 30, 253, 1],
            pickerCancelBtnColor: [120, 30, 253, 1],
            pickerToolBarBg: [255, 255, 255, 1],
            pickerBg: [255, 255, 255, 1],
            pickerData: selects||[],
            onPickerConfirm: onChange,
            selectedValue: value || undefined
        })
        Picker.show()
    }
    componentWillUnmount() {
        Picker.hide()
    }
    render() {
        var { valueDisplay, value, image, placeholder } = this.props
        valueDisplay = valueDisplay || (val => val && val[0])
        value = valueDisplay(value)
        return (
            <Touchable onPress={this.openSelects.bind(this)}>
                <View style={styles.inputBox}>
                    <View style={{ width: scale(50) }}>
                        <Image source={image} />
                    </View>
                    <Text style={[styles.inputText, value && { color: "#666" }]}>{value || placeholder}</Text>
                </View>
            </Touchable>
        )
    }
}

// function genDate() {
//     var year = [2018]
//     var month = []
//     var day = []
//     for (let i = 0; i < 12; i++) {
//         month.push(i + 1)
//     }
//     for (let i = 0; i < 31; i++) {
//         day.push(i + 1)
//     }
//     return [year, month, day]
// }

function genDate() {
    var year = [2018]
    var month = [7]
    var day = [10, 11, 16, 17, 18, 19, 20, 21, 22]
    return [year, month, day]
}

// function genTime() {
//     var hour = []
//     var min = []
//     for (let i = 0; i < 24; i++) {
//         hour.push(i + 1)
//     }
//     for (let i = 0; i < 60; i++) {
//         min.push(i + 1)
//     }
//     return [hour, min]
// }
function genTime() {
    var hour = ['08', '10', '12', '14']
    var min = ['00']
    return [hour, min]
}

function paddingZero(str) {
    str += ''
    return str.length > 1 ? str : ('0' + str)
}

export default class extends React.Component {
    static navigationOptions = {
        title: '旅游票务',
        headerRight: <View />,
    }
    state = {
        departure: null,
        destination: null,
        departure_date: null,
        departure_time: null,
        price: null,
        phone: null,
        name: null,
        idcard: null,
        paying: false,
        departureList: [],
        destinationList: [],
    }
    componentDidMount() {
        if (!UserStore.user) {
            this.props.navigation.navigate('UserLogin',{
                callback:()=>{
                    this.fetchDepartureList()
                    this.fetchDestinationList()
                }
            })
            return
        }
        this.fetchDepartureList()
        this.fetchDestinationList()
    }
    async fetchDepartureList() {
        var res = await request("https://www.bjzntq.com:8888/Ticket/getUniversityInfo/", {
            tokeninfo: UserStore.user.tokeninfo
        })
        this.setState({
            departureList: res.data || []
        })
    }
    async fetchDestinationList() {
        var res = await request("https://www.bjzntq.com:8888/Ticket/getDestinationInfo/", {
            tokeninfo: UserStore.user.tokeninfo
        })
        this.setState({
            destinationList: res.data || []
        })
    }
    async fetchPrice() {
        if (!this.state.departure || !this.state.destination) {
            return
        }
        var res = await request("https://www.bjzntq.com:8888/Ticket/getTicketPriceInfo/", {
            "tokeninfo": "12$北极$$0$$$",
            "departure_id": this.state.departure.value,
            "destination_id": this.state.destination.value
        })
        this.setState({
            price: res.data.price
        })
    }
    async onPay(type) {
        const typeMap = {
            wechat: 1,
            alipay: 2
        }
        const { departure, destination, departure_date, departure_time, price, phone, name, idcard } = this.state
        try {
            var res = await request("https://www.bjzntq.com:8888/Ticket/commitTicketInfo/", {
                "tokeninfo": UserStore.user.tokeninfo,
                "client": 2,
                "pay_way": typeMap[type],
                "total": 0.1,
                "phone": phone,
                "departure_date": `${departure_date[0]}-${paddingZero(departure_date[1])}-${paddingZero(departure_date[2])}`,
                "departure_time": `${paddingZero(departure_time[0])}:${paddingZero(departure_time[1])}`,
                "departure_place_id": departure.value,
                "destination_place_id": destination.value,
                "contacts": name,
                "idcard": idcard
            })
        } catch (err) {
            Alert.alert(err.message)
            return
        }
        if(type=="alipay"){
            await alipayByInfo(res.data)
        }
        if(type=="wechat"){
            await wechatByInfo(res.data)
        }
        this.props.navigation.dispatch(StackActions.reset({ 
            index: 0, 
            actions: [NavigationActions.navigate({ routeName: 'Home' })], 
        }))
    }
    async onConfirm() {
        const { departure, destination, departure_date, departure_time, price, phone, name, idcard } = this.state
        if (!departure || !destination || !departure_date || !departure_time || !price || !phone || !name || !idcard) {
            Alert.alert("信息填写不完整")
            return
        }
        this.setState({ paying: true })
    }
    render() {
        const now = new Date()
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView style={{ padding: scale(15) }}>
                    <Text style={styles.title}>用车信息</Text>
                    <SelectInput
                        image={require('../../images/school.png')}
                        placeholder="请选择始发地"
                        selects={this.state.departureList.map(it => it.name)}
                        value={this.state.departure ? [this.state.departure.label] : null}
                        onChange={val => {
                            let item = this.state.departureList.find(it => it.name == val[0])
                            this.setState({
                                departure: {
                                    value: item.id,
                                    label: val[0],
                                }
                            })
                            this.fetchPrice()
                        }} />
                    <SelectInput
                        image={require('../../images/hometown.png')}
                        placeholder="请选择目的地"
                        selects={this.state.destinationList.map(it => it.name)}
                        value={this.state.destination ? [this.state.destination.label] : null}
                        onChange={val => {
                            this.setState({
                                destination: {
                                    value: this.state.destinationList.find(it => it.name == val[0]).id,
                                    label: val[0],
                                }
                            })
                            this.fetchPrice()
                        }} />
                    <SelectInput
                        image={require('../../images/calendar.png')}
                        placeholder="请选择出发日期"
                        selects={genDate()}
                        valueDisplay={val => this.state.departure_date && `${val[0]}-${paddingZero(val[1])}-${paddingZero(val[2])}`}
                        value={this.state.departure_date || [now.getFullYear(), now.getMonth() + 1, now.getDay() + 1]}
                        onChange={val => this.setState({ departure_date: val })} />
                    <SelectInput
                        image={require('../../images/时间.png')}
                        placeholder="请选择出发时间"
                        selects={genTime()}
                        valueDisplay={val => this.state.departure_time && `${paddingZero(val[0])}:${paddingZero(val[1])}`}
                        value={this.state.departure_time || [now.getHours(), now.getMinutes()]}
                        onChange={val => this.setState({ departure_time: val })} />
                    <Text style={styles.title}>乘车人信息</Text>
                    <View style={styles.inputBox}>
                        <View style={{ width: scale(50) }}>
                            <Text style={styles.labelText}>姓名</Text>
                        </View>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder="请输入你的姓名"
                            style={styles.textInput}
                            value={this.state.name}
                            onChangeText={str => this.setState({ name: str })} />
                    </View>
                    <View style={styles.inputBox}>
                        <View style={{ width: scale(50) }}>
                            <Text style={styles.labelText}>身份证</Text>
                        </View>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder="请输入身份证"
                            style={styles.textInput}
                            value={this.state.idcard}
                            onChangeText={str => this.setState({ idcard: str })} />
                    </View>
                    <View style={styles.inputBox}>
                        <View style={{ width: scale(50) }}>
                            <Text style={styles.labelText}>电话</Text>
                        </View>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder="请输入联系方式"
                            style={styles.textInput}
                            value={this.state.phone}
                            onChangeText={str => this.setState({ phone: str })} />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: scale(12) }}>
                        <Text style={{ fontSize: scale(17), color: "#6A617A", flex: 1 }}>费用</Text>
                        <Text style={{ fontSize: scale(17), color: "#E339D3" }}>{this.state.price || 0}元</Text>
                    </View>
                    <Touchable style={{ height: scale(42), borderRadius: scale(21), backgroundColor: "#781EFD", justifyContent: "center", alignItems: "center", marginTop: scale(14) }} onPress={this.onConfirm.bind(this)}>
                        <Text style={{ color: "#fff", fontSize: scale(15) }}>支付</Text>
                    </Touchable>
                    <Touchable style={{ height: scale(42), borderRadius: scale(21), backgroundColor: "#781EFD", justifyContent: "center", alignItems: "center", marginTop: scale(10) }} onPress={() => this.props.navigation.navigate('TicketingList')}>
                        <Text style={{ color: "#fff", fontSize: scale(15) }}>查看购票订单</Text>
                    </Touchable>
                    <Text style={{ fontSize: scale(13), lineHeight: scale(18), color: "#6A617A", marginTop: scale(16) }}>{usage}</Text>
                </ScrollView>
                <PayModal
                    visible={this.state.paying}
                    onClose={() => this.setState({ paying: false })}
                    onPay={this.onPay.bind(this)} />
            </View>
        );
    }
}