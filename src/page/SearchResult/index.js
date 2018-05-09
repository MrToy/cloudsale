import React from 'react';
import { Text, View } from 'react-native';


export default class extends React.Component {
    static navigationOptions = {
        title: '搜索',
        headerRight:()=>{},
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1' }}>
                <Text>搜索结果页</Text>
            </View>
        );
    }
}