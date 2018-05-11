import PropTypes from 'prop-types';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import TouchableNativeFeedbackEx from '../../components/TouchableNativeFeedbackEx';
import { scale } from '../../utils/dimension';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1'
    },
    userInfo: {
        height: scale(93), backgroundColor: "#fff", marginTop: scale(6), flexDirection: "row", alignItems: "center"
    },
    userInfoImage: {
        width: scale(65), height: scale(65), borderRadius: scale(65), marginLeft: scale(23)
    },
    userInfoTextBox: {
        marginLeft: scale(13)
    },
    userInfoTextName: {
        fontSize: scale(17), color: "#484848", lineHeight: scale(24)
    },
    userInfoTextAddr: {
        fontSize: scale(14), color: "#616161", lineHeight: scale(20), marginTop: scale(5)
    },
    navBar: {
        height: scale(64), backgroundColor: "#fff", marginTop: scale(7), flexDirection: "row"
    },
    navItem: {
        width: "20%", alignItems: "center", justifyContent: "center"
    },
    navItemImg: {
        width: scale(20), height: scale(20),resizeMode: "contain"
    },
    navItemText: {
        marginTop: scale(8), fontSize: scale(12), lineHeight: scale(17), color: "#6A617A"
    }
})


class ListMenuItem extends React.Component {
    static propTypes = {
        image: PropTypes.object,
        text: PropTypes.string,
        onPress:PropTypes.func,
    }
    render() {
        const { image, text, onPress } = this.props
        return (
            <TouchableNativeFeedbackEx onPress={onPress}>
                <View style={{ height: scale(46), backgroundColor: "#fff", flexDirection: "row", marginTop: scale(0.5), alignItems: "center" }}>
                    <Image style={{ width: scale(20), height: scale(20), resizeMode: "contain", marginLeft: scale(17) }} source={image} />
                    <Text style={{ color: "#6A617A", fontSize: scale(14), marginLeft: scale(14) }}>{text}</Text>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Image style={{ width: scale(15), height: scale(21), resizeMode: "contain", marginRight: scale(13) }} source={require('../../images/right_indicator.png')} />
                    </View>
                </View>
            </TouchableNativeFeedbackEx>
        )
    }
}

export default class extends React.Component {
    static navigationOptions = {
        title: '个人中心',
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                source={focused ? require('../../images/me_select_icon.png') : require('../../images/me_icon.png')} />
        ),
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userInfo}>
                    <Image style={styles.userInfoImage} source={{ uri: "http://passport.jd.com/new/misc/skin/df/i/no-img_mid_.jpg" }} />
                    <View style={styles.userInfoTextBox}>
                        <Text style={styles.userInfoTextName}>Name</Text>
                        <Text style={styles.userInfoTextAddr}>我的收货地址</Text>
                    </View>
                </View>
                <View style={styles.navBar}>
                    <View style={styles.navItem}>
                        <Image style={styles.navItemImg} source={require('../../images/wait_pay_icon.png')} />
                        <Text style={styles.navItemText}>待付款</Text>
                    </View>
                    <View style={styles.navItem}>
                        <Image style={styles.navItemImg} source={require('../../images/wait_receive_icon.png')} />
                        <Text style={styles.navItemText}>待收货</Text>
                    </View>
                    <View style={styles.navItem}>
                        <Image style={styles.navItemImg} source={require('../../images/wait_evaluate_icon.png')} />
                        <Text style={styles.navItemText}>待评价</Text>
                    </View>
                    <View style={styles.navItem}>
                        <Image style={styles.navItemImg} source={require('../../images/shouhou_icon.png')} />
                        <Text style={styles.navItemText}>退换/售后</Text>
                    </View>
                    <View style={[styles.navItem,{borderLeftWidth:scale(0.5),borderLeftColor:"#F2F2F2"}]}>
                        <Image style={styles.navItemImg} source={require('../../images/all_order_icon.png')} />
                        <Text style={styles.navItemText}>全部订单</Text>
                    </View>
                </View>
                <View style={{ marginTop: 6 }}>
                    <ListMenuItem image={require('../../images/my_message_icon.png')} text="我的消息" />
                    <ListMenuItem image={require('../../images/my_collection_icon.png')} text="我的收藏" />
                    <ListMenuItem image={require('../../images/my_foot_icon.png')} text="足迹" />
                </View>
                <View style={{ marginTop: 6 }}>
                    <ListMenuItem 
                        text="意见反馈"
                        image={require('../../images/feedback_icon.png')}
                        onPress={() => this.props.navigation.navigate('Feedback')} />
                    <ListMenuItem 
                        text="我的消息"
                        image={require('../../images/about_us_icon.png')}
                        onPress={() => this.props.navigation.navigate('AboutUs')} />
                </View>
            </View>
        );
    }
}