import React from 'react';
import { Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../utils/dimension';
import UserStore from '../../../utils/user';

export default class PageUserSignin extends React.Component {
    static navigationOptions = {
        title: '我的地址',
        headerRight: (
            <Touchable style={{marginRight:scale(14)}}>
                <Text style={{fontSize:scale(15),color:"#fff"}}>完成</Text>
            </Touchable>
        ),
    }
    async logout() {
        await UserStore.clearUserInfo()
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(6) }}>

            </View>
        )
    }
}