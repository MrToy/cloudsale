import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import TouchableEx from '../../components/TouchableEx';
import { scale } from '../../utils/dimension';
import UserStore from '../../utils/user';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1', height: "100%"
    },
    userInfo: {
        height: scale(93), backgroundColor: "#fff", marginTop: scale(6), flexDirection: "row", alignItems: "center"
    },
    userInfoImage: {
        width: scale(65), height: scale(65), borderRadius: scale(32.5), marginLeft: scale(23)
    },
    userInfoTextBox: {
        marginLeft: scale(13)
    },
    userInfoTextName: {
        fontSize: scale(17), color: "#484848"
    },
    navBar: {
        height: scale(64), backgroundColor: "#fff", marginTop: scale(7), flexDirection: "row"
    },
    navItem: {
        width: "20%", alignItems: "center", justifyContent: "center"
    },
    navItemImg: {
        width: scale(20), height: scale(20), resizeMode: "contain"
    },
    navItemText: {
        marginTop: scale(8), fontSize: scale(12), lineHeight: scale(17), color: "#6A617A"
    }
})


class ListMenuItem extends React.Component {
    static propTypes = {
        image: PropTypes.any,
        text: PropTypes.string,
        onPress: PropTypes.func,
    }
    render() {
        const { image, text, onPress } = this.props
        return (
            <Touchable onPress={onPress}>
                <View style={{ height: scale(46), backgroundColor: "#fff", flexDirection: "row", marginTop: scale(0.5), alignItems: "center" }}>
                    <Image style={{ width: scale(20), height: scale(20), resizeMode: "contain", marginLeft: scale(17) }} source={image} />
                    <Text style={{ color: "#6A617A", fontSize: scale(14), marginLeft: scale(14) }}>{text}</Text>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Image style={{ width: scale(15), height: scale(21), resizeMode: "contain", marginRight: scale(13) }} source={require('../../images/right_indicator.png')} />
                    </View>
                </View>
            </Touchable>
        )
    }
}

class NavMenuItem extends React.Component {
    static propTypes = {
        image: PropTypes.any,
        text: PropTypes.string,
        onPress: PropTypes.func,
        style: PropTypes.object
    }
    render() {
        const { image, text, onPress, style } = this.props
        return (
            <TouchableEx onPress={onPress}>
                <View style={[styles.navItem, style]}>
                    <Image style={styles.navItemImg} source={image} />
                    <Text style={styles.navItemText}>{text}</Text>
                </View>
            </TouchableEx>
        )
    }
}

@observer
export default class PageUser extends React.Component {
    static navigationOptions = ({navigation})=>({
        title: '个人中心',
        tabBarLabel: '我的',
        headerRight: (
            <Touchable onPress={()=>navigation.navigate('UserSetting')} style={{marginRight:scale(12)}}>
                <Image style={{width:scale(20),height:scale(20)}} source={require('../../images/setting.png')} />
            </Touchable>
        ),
        headerLeft: <View />,
        tabBarIcon: ({ focused }) => (
            <Image source={focused ? require('../../images/me_select_icon.png') : require('../../images/me_icon.png')} />
        ),
    })
    render() {
        var user=UserStore.user
        return (
            <View style={styles.container}>
                {user ? (
                    <View style={styles.userInfo}>
                        <Image style={styles.userInfoImage} source={user.avatarUrl ? { uri: user.avatarUrl } : require('../../images/avatar.png')} />
                        <View style={styles.userInfoTextBox}>
                            <Text style={styles.userInfoTextName}>{user.username}</Text>
                        </View>
                    </View>
                ) : (
                        <TouchableEx onPress={() => this.props.navigation.navigate('UserLogin')}>
                            <View style={styles.userInfo}>
                                <Image style={styles.userInfoImage} source={require('../../images/avatar.png')} />
                                <View style={styles.userInfoTextBox}>
                                    <Text style={styles.userInfoTextName}>请点击登录</Text>
                                </View>
                            </View>
                        </TouchableEx>
                    )}
                <View style={styles.navBar}>
                    <NavMenuItem
                        text="待付款"
                        image={require('../../images/wait_pay_icon.png')}
                        onPress={() => this.props.navigation.navigate('UserOrder', { type: 0 })} />
                    <NavMenuItem
                        text="待收货"
                        image={require('../../images/wait_receive_icon.png')}
                        onPress={() => this.props.navigation.navigate('UserOrder', { type: 1 })} />
                    <NavMenuItem
                        text="待评价"
                        image={require('../../images/wait_evaluate_icon.png')}
                        onPress={() => this.props.navigation.navigate('UserOrder', { type: 2 })} />
                    <NavMenuItem
                        text="退换/售后"
                        image={require('../../images/shouhou_icon.png')}
                        onPress={() => this.props.navigation.navigate('UserOrder', { type: 3 })} />
                    <NavMenuItem
                        style={{ borderLeftWidth: scale(0.5), borderLeftColor: "#F2F2F2" }}
                        text="全部订单"
                        image={require('../../images/all_order_icon.png')}
                        onPress={() => this.props.navigation.navigate('UserOrder', { type: 4 })} />
                </View>
                <View style={{ marginTop: 6 }}>
                    <ListMenuItem
                        text="我的消息"
                        image={require('../../images/my_message_icon.png')} />
                    <ListMenuItem
                        text="我的收藏"
                        image={require('../../images/my_collection_icon.png')} />
                    <ListMenuItem
                        text="足迹"
                        image={require('../../images/my_foot_icon.png')} />
                    <ListMenuItem
                        text="地址管理"
                        image={require('../../images/addr.png')}
                        onPress={() => this.props.navigation.navigate('UserAddress')} />
                </View>
                <View style={{ marginTop: 6 }}>
                    <ListMenuItem
                        text="意见反馈"
                        image={require('../../images/feedback_icon.png')}
                        onPress={() => this.props.navigation.navigate('Feedback')} />
                    <ListMenuItem
                        text="关于我们"
                        image={require('../../images/about_us_icon.png')}
                        onPress={() => this.props.navigation.navigate('AboutUs')} />
                </View>
            </View>
        );
    }
}