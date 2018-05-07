import React from 'react';
import { StatusBar, StyleSheet, View,Text,Image } from 'react-native';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
	static navigationOptions = {
        title: '个人中心',
        tabBarLabel:'我的',
		headerStyle: {
			backgroundColor: '#781EFD',
            height: scale(45),
        },
        tabBarIcon:({focused,tintColor})=>(
            focused?(
                <Image style={{width:"100%",height:"100%",resizeMode:"contain"}} source={require('../../images/me_select_icon.png')} />
            ):(
                <Image style={{width:"100%",height:"100%",resizeMode:"contain"}} source={require('../../images/me_icon.png')} />
            )
        ),
		headerTintColor: '#fff',
		headerTitleStyle: {
            textAlign:'center',
            alignSelf:'center',
            flex:1,
            fontSize:scale(17)
		},
	}
	render() {
		return (
			<View style={{backgroundColor: '#f1f1f1'}}>
                <Text>个人中心</Text>
			</View>
		);
	}
}