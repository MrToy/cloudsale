import React from 'react';
import { StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import { scale } from '../../utils/dimension';
import headerStyle from '../../components/Header/style'


export default class extends React.Component {
    static navigationOptions = {
        title: '搜索',
        headerRight:()=>{},
        ...headerStyle
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1' }}>
                <Text>搜索结果页</Text>
            </View>
        );
    }
}