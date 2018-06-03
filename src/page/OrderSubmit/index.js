import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { scale } from '../../utils/dimension';


export default class extends React.Component {
    static navigationOptions = {
        title: '确认订单',
        headerRight: <View />,
    }
    render() {
        const id = this.props.navigation.getParam('id')
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <ScrollView>
                    <Text style={{ fontSize: scale(13), lineHeight: scale(36), marginLeft: scale(15) }}>{id}</Text>
                </ScrollView>
                <View>
                    <View>
                        <Text>实付金额:</Text>
                        <Text>¥ 134.00</Text>
                    </View>
                    <View>
                        <Text>微信支付</Text>
                    </View>
                </View>
            </View>
        );
    }
}