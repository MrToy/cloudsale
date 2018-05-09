import React from 'react';
import { StatusBar, StyleSheet, View,Text,Image } from 'react-native';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
	static navigationOptions = {
        title: '个人中心',
        tabBarLabel:'我的',
        tabBarIcon:({focused,tintColor})=>(
            <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                source={focused ? require('../../images/me_select_icon.png') : require('../../images/me_icon.png')} />
        ),
	}
	render() {
		return (
			<View style={{backgroundColor: '#f1f1f1'}}>
                <Text>个人中心</Text>
			</View>
		);
	}
}