import React from 'react';
import { View, Image, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../utils/dimension';
import reqest from '../../utils/request'


const styles = StyleSheet.create({
    title: { fontSize: scale(17), color: "#6A617A", lineHeight: scale(24), marginBottom: scale(3) },
    inputBox: { height: scale(42), borderColor: "#C8BEDB", borderWidth: 1, flexDirection: "row", alignItems: "center", padding: scale(5), marginBottom: scale(7) },
    inputText: { fontSize: scale(14), color: "#A5A5A5" },
    labelText: { fontSize: scale(13), color: "#6A617A", marginLeft: scale(5) },
    textInput: { fontSize: scale(14), flex: 1 }
})

const usage = `注意事项：
1、务必准确填写相关信息，避免耽误您的行程。
2、请准确选择预计出发时间，并至少提前一天订购车票；我们将优先安排预购票用户乘车，当日临时购票可能导致无法准点出发。
3、我们会提前一天将准确车辆班次信息发送至您的手机，方便您安排行程
4、考虑道路交通因素，请合理安排出发时间
5、如有任何问题请联系：15102346835
`

export default class extends React.Component {
    static navigationOptions = {
        title: '旅游票务',
        headerRight: <View />,
    }
    state = {
        "departure_place_id":null,
        "destination_place_id":null
    }
    async onConfirm() {

    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView style={{ padding: scale(15) }}>
                    <Text style={styles.title}>用车信息</Text>
                    <Touchable>
                        <View style={styles.inputBox}>
                            <View style={{ width: scale(50) }}>
                                <Image source={require('../../images/school.png')} />
                            </View>
                            <Text style={styles.inputText}>请选择始发地</Text>
                        </View>
                    </Touchable>
                    <Touchable>
                        <View style={styles.inputBox}>
                            <View style={{ width: scale(50) }}>
                                <Image source={require('../../images/hometown.png')} />
                            </View>
                            <Text style={styles.inputText}>请选择目的地</Text>
                        </View>
                    </Touchable>
                    <Touchable>
                        <View style={styles.inputBox}>
                            <View style={{ width: scale(50) }}>
                                <Image source={require('../../images/calendar.png')} />
                            </View>
                            <Text style={styles.inputText}>请选择出发日前</Text>
                        </View>
                    </Touchable>
                    <Touchable>
                        <View style={styles.inputBox}>
                            <View style={{ width: scale(50) }}>
                                <Image source={require('../../images/时间.png')} />
                            </View>
                            <Text style={styles.inputText}>请选择出发时间</Text>
                        </View>
                    </Touchable>
                    <Text style={styles.title}>乘车人信息</Text>
                    <View style={styles.inputBox}>
                        <View style={{ width: scale(50) }}>
                            <Text style={styles.labelText}>姓名</Text>
                        </View>
                        <TextInput placeholder="请输入你的姓名" style={styles.textInput} />
                    </View>
                    <View style={styles.inputBox}>
                        <View style={{ width: scale(50) }}>
                            <Text style={styles.labelText}>身份证</Text>
                        </View>
                        <TextInput placeholder="请输入身份证" style={styles.textInput} />
                    </View>
                    <View style={styles.inputBox}>
                        <View style={{ width: scale(50) }}>
                            <Text style={styles.labelText}>电话</Text>
                        </View>
                        <TextInput placeholder="请输入联系方式" style={styles.textInput} />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: scale(12) }}>
                        <Text style={{ fontSize: scale(17), color: "#6A617A", flex: 1 }}>费用</Text>
                        <Text style={{ fontSize: scale(17), color: "#E339D3" }}>92元</Text>
                    </View>
                    <Touchable style={{ height: scale(42), borderRadius: scale(21), backgroundColor: "#781EFD", justifyContent: "center", alignItems: "center", marginTop: scale(14) }} onPress={this.onConfirm.bind(this)}>
                        <Text style={{ color: "#fff", fontSize: scale(15) }}>支付</Text>
                    </Touchable>
                    <Touchable style={{ height: scale(42), borderRadius: scale(21), backgroundColor: "#781EFD", justifyContent: "center", alignItems: "center", marginTop: scale(10) }}>
                        <Text style={{ color: "#fff", fontSize: scale(15) }}>查看购票订单</Text>
                    </Touchable>
                    <Text style={{ fontSize: scale(13), lineHeight: scale(18), color: "#6A617A", marginTop: scale(16) }}>{usage}</Text>
                </ScrollView>
            </View>
        );
    }
}