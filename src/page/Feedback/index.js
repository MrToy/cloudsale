import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { scale } from '../../utils/dimension';


export default class extends React.Component {
    static navigationOptions = {
        title: '意见反馈',
        headerRight: () => { },
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%"}}>
                <ScrollView>
                    <Text style={{ fontSize: scale(13),lineHeight:scale(36),marginLeft:scale(15) }}>问题类型</Text>
                </ScrollView>
            </View>
        );
    }
}