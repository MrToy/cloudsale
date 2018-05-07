import React from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';
import { scale } from '../../utils/dimension';
import NavMenus from './NavMenus';
import Swiper from './Swiper';
import FloorTitle from '../../components/FloorTitle'


export default class extends React.Component {
    static navigationOptions = {
        title: '首页',
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                source={focused ? require('../../images/home_select_icon.png') : require('../../images/home_icon.png')} />
        ),
        headerStyle: {
            backgroundColor: '#781EFD',
            height: scale(45),
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
            fontSize: scale(17)
        },
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1' }}>
                <StatusBar backgroundColor="#781EFD" barStyle="light-content" />
                <View style={{ width: "100%", height: scale(163), marginBottom: scale(10) }}>
                    <Swiper />
                </View>
                <View style={{ width: "100%", height: scale(140), marginBottom: scale(10), backgroundColor: '#fff' }}>
                    <NavMenus />
                </View>
                <FloorTitle label="限时抢购" color="#781EFD" />
            </View>
        );
    }
}