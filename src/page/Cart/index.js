import React from 'react';
import { StatusBar, StyleSheet, View,Text,Image } from 'react-native';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
	static navigationOptions = {
		title: '购物车',
        tabBarIcon:({focused,tintColor})=>(
            <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                source={focused ? require('../../images/cart_select_icon.png') : require('../../images/cart_icon.png')} />
        ),
	}
	render() {
		return (
			<View style={{backgroundColor: '#f1f1f1'}}>
                <Text>购物车</Text>
			</View>
		);
	}
}