import React from 'react';
import { StatusBar, StyleSheet, View, Image, ScrollView } from 'react-native';
import { scale } from '../../utils/dimension';
import NavMenus from './NavMenus';
import Swiper from './Swiper';
import FloorTitle from '../../components/FloorTitle'
import SearchButton from './SearchButton'


export default class extends React.Component {
    static navigationOptions = {
        title: '首页',
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                source={focused ? require('../../images/home_select_icon.png') : require('../../images/home_icon.png')} />
        )
    }
    render() {
        return (
            <View>
                <StatusBar backgroundColor="#781EFD" barStyle="light-content" />
                <ScrollView style={{ backgroundColor: '#f1f1f1' }}>
                    <View style={{ width: "100%", height: scale(163), marginBottom: scale(10) }}>
                        <Swiper />
                    </View>
                    <View style={{ width: "100%", height: scale(140), marginBottom: scale(10), backgroundColor: '#fff' }}>
                        <NavMenus />
                    </View>
                    <FloorTitle label="限时抢购" color="#781EFD" />
                </ScrollView>
                <View style={{ position: 'absolute', top: scale(5), width: "100%", alignItems: "center",paddingLeft:scale(11),paddingRight:scale(11) }}>
                    <SearchButton navigation={this.props.navigation} placeholder="搜索商品/店铺" />
                </View>
            </View>
        );
    }
}