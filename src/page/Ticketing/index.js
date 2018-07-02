import React from 'react';
import { View, Image, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../utils/dimension';


const styles = StyleSheet.create({
    title: { fontSize: scale(17), color: "#6A617A", lineHeight: scale(24), marginBottom: scale(3) },
    inputBox: { height: scale(42), borderColor: "#C8BEDB", borderWidth: 1, flexDirection: "row", alignItems: "center", padding: scale(5), marginBottom: scale(7) },
    inputText: { fontSize: scale(14), color: "#A5A5A5" },
    labelText:{fontSize:scale(13),color:"#6A617A",marginLeft:scale(5)},
    textInput:{fontSize: scale(14),flex:1}
})

const usage = `使用说明：
1、本功能为在校学生回家提供方便快捷的租车大巴服务
2、请准确填写相关信息，避免信息有误耽误您的行程
3、预付款用于安排车辆，根据实际费用进行多退少补
4、发车前一天会将车辆信息发送至您的手机
5、如有任何问题请联系：123456789
`

export default class extends React.Component {
    static navigationOptions = {
        title: '旅游票务',
        headerRight: <View />,
    }
    state = {
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView style={{ padding: scale(15) }}>
                    <Text style={styles.title}>用车信息</Text>
                    <View style={styles.inputBox}>
                        <View style={{ width: scale(50) }}>
                            <Image source={require('../../images/school.png')} />
                        </View>
                        <Text style={styles.inputText}>请选择始发地</Text>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={{ width: scale(50) }}>
                            <Image source={require('../../images/hometown.png')} />
                        </View>
                        <Text style={styles.inputText}>请选择始发地</Text>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={{ width: scale(50) }}>
                            <Image source={require('../../images/calendar.png')} />
                        </View>
                        <Text style={styles.inputText}>请选择始发地</Text>
                    </View>
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
                        <Text style={{ fontSize: scale(17), color: "#6A617A", flex: 1 }}>预付款（多退少补)</Text>
                        <Text style={{ fontSize: scale(17), color: "#E339D3" }}>100元</Text>
                    </View>
                    <Touchable style={{ height: scale(42), borderRadius: scale(21), backgroundColor: "#781EFD", justifyContent: "center", alignItems: "center", marginTop: scale(14) }}>
                        <Text style={{ color: "#fff", fontSize: scale(15) }}>预付款支付</Text>
                    </Touchable>
                    <Text style={{ fontSize: scale(13), lineHeight: scale(18), color: "#6A617A", marginTop: scale(16) }}>{usage}</Text>
                </ScrollView>
            </View>
        );
    }
}