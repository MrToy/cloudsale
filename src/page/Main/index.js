import React from 'react';
import { StatusBar, StyleSheet, View, Image, ScrollView,AsyncStorage } from 'react-native';
import { scale } from '../../utils/dimension';
import NavMenus from './NavMenus';
import Swiper from './Swiper';
import FloorTitle from '../../components/FloorTitle'
import SearchButton from './SearchButton'
import CategoryGrid from './CategoryGrid'
import ChannelGrid from './ChannelGrid'
import CommodityList from '../../components/CommodityList'
import {setUserInfo} from '../../components/User'

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
    state = {
        banner: [],
        category: [],
        categoryList: [],
        choice: [],
        hot: []
    }
    componentDidMount() {
        this.fetchCommodity()
        setUserInfo({
            "username": "北极",
            "province": "",
            "user_id": 12,
            "city": "",
            "gender": 0,
            "avatarUrl": "",
            "tokeninfo": "12$北极$$0$$$"
        })
    }
    async fetchCommodity() {
        var res = await fetch("https://www.bjzntq.com:8888/Commodity/GetHomeData", { method: "POST" }).then(res => res.json())
        if (res.result != 200) {
            return
        }
        this.setState(res.data)
    }
    render() {
        const { banner, category, categoryList, choice, hot } = this.state
        return (
            <View>
                <StatusBar backgroundColor="#781EFD" barStyle="light-content" />
                <ScrollView style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                    <View style={{ height: scale(163), marginBottom: scale(10) }}>
                        {banner.length ? (
                            <Swiper list={banner} />
                        ) : null}
                    </View>
                    <View style={{ height: scale(140), marginBottom: scale(10), backgroundColor: '#fff' }}>
                        <NavMenus list={category} navigation={this.props.navigation} />
                    </View>
                    <FloorTitle label="热门频道" color="#66ABF3" />
                    <View style={{ backgroundColor: '#fff', paddingBottom: scale(9), marginBottom: scale(7) }}>
                        <ChannelGrid list={hot} navigation={this.props.navigation} />
                    </View>
                    <FloorTitle label="精选类目" color="#E339D3" />
                    {categoryList.map((category, i) => (
                        <CategoryGrid key={i} data={category} style={{ marginBottom: scale(6) }} navigation={this.props.navigation} />
                    ))}
                    <FloorTitle label="精选商品" color="#AEA649" />
                    <CommodityList list={choice.map(it => ({
                        id: it.id,
                        imageUrl: it.image_url,
                        name: it.name,
                        price: it.deduct_price
                    }))} />
                </ScrollView>
                <View style={{ position: 'absolute', top: scale(5), width: "100%", alignItems: "center", paddingLeft: scale(11), paddingRight: scale(11) }}>
                    <SearchButton navigation={this.props.navigation} placeholder="搜索商品/店铺" />
                </View>
            </View>
        );
    }
}