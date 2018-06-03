import React from 'react';
import { StatusBar, StyleSheet, View,Text,Image } from 'react-native';
import { scale } from '../../utils/dimension';
import {getUserInfo} from '../../components/User'

export default class extends React.Component {
	static navigationOptions = {
		title: '购物车',
        tabBarIcon:({focused,tintColor})=>(
            <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                source={focused ? require('../../images/cart_select_icon.png') : require('../../images/cart_icon.png')} />
        ),
	}
	state={
		list:[]
	}
	componentDidMount(){
		this.fetchList()
	}
	async fetchList(){
		var user=await getUserInfo()
		var res = await fetch("https://www.bjzntq.com:8888/Commodity/getCartCommodity/", {
            method: "POST",
            body: JSON.stringify({
                tokeninfo:user.tokeninfo,
            })
		}).then(res => res.json())
		console.log(res)
        this.setState({list:res.data||[]})
	}
	render() {
		return (
			<View style={{backgroundColor: '#f1f1f1'}}>
				{this.state.list.map((it,i)=>(
					<View key={i}>
						<Text>{it.shopName}</Text>
					</View>
				))}           
			</View>
		);
	}
}