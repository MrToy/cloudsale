import React from 'react';
import { StatusBar, StyleSheet, View,Text,Image } from 'react-native';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
	static navigationOptions = {
        title: '列表页',
        tabBarLabel:'分类',
        tabBarIcon:({focused,tintColor})=>(
            focused?(
                <Image style={{width:"100%",height:"100%",resizeMode:"contain"}}  source={require('../../images/category_select_icon.png')} />
            ):(
                <Image style={{width:"100%",height:"100%",resizeMode:"contain"}}  source={require('../../images/category_icon.png')} />
            )
        ),
		headerStyle: {
			backgroundColor: '#781EFD',
            height: scale(45),
        },
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
                <Text>列表页</Text>
			</View>
		);
	}
}