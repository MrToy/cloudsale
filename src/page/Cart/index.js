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
	onSelect(id, v) {
		this.setState({
			selects: {
				...this.state.selects,
				[id]: v
			}
		})
	}
	isSelectAll(n) {
		if(!this.state.list[n].goodsList.length){
			return false
		}
		for (let i = 0; i < this.state.list[n].goodsList.length; i++) {
			if (!this.state.selects[this.state.list[n].goodsList[i].commodityId]) {
				return false
			}
		}
		return true
	}
	onSelectAll(n, v) {
		var selects = this.state.selects
		for (let i = 0; i < this.state.list[n].goodsList.length; i++) {
			selects[this.state.list[n].goodsList[i].commodityId] = v
		}
		this.setState({ selects })
	}
	isSelectGroupAll() {
		if(!this.state.list.length){
			return false
		}
		for (let j = 0; j < this.state.list.length; j++) {
			if (!this.isSelectAll(j)) {
				return false
			}
		}
		return true
	}
	onSelectGroupAll(v) {
		var selects = this.state.selects
		for (let j = 0; j < this.state.list.length; j++) {
			for (let i = 0; i < this.state.list[j].goodsList.length; i++) {
				selects[this.state.list[j].goodsList[i].commodityId] = v
			}
		}
		this.setState({ selects })
	}
	setCount(i, ii, val) {
		var list = this.state.list
		this.state.list[i].goodsList[ii].count = val
		this.setState({ list })
	}
	getList(){
		var selects = this.state.selects
		var list = []
		for (let j = 0; j < this.state.list.length; j++) {
			let goodsList=[]
			for (let i = 0; i < this.state.list[j].goodsList.length; i++) {
				if(selects[this.state.list[j].goodsList[i].commodityId]){
					goodsList.push(this.state.list[j].goodsList[i])
				}
			}
			if(goodsList.length){
				list.push({
					...this.state.list[j],
					goodsList
				})
			}
		}
		return list
	}
	submit(){
		var list=this.getList()
		this.props.navigation.navigate('OrderSubmit', { list })
	}
	render() {
		return (
			<View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
				<ScrollView style={{ flex: 1, margin: scale(5) }}>
					{this.state.list.map((it, i) => (
						<View key={i} style={{ backgroundColor: "#fff", padding: scale(10) }}>
							<View style={{ flexDirection: "row", alignItems: "center", height: scale(39) }}>
								<Checkbox value={this.isSelectAll(i)} onChange={v => this.onSelectAll(i, v)} />
								<Text>{it.shopName}</Text>
							</View>
							{it.goodsList.map((itit, ii) => (
								<View key={ii} style={{ flexDirection: "row", alignItems: "center", borderTopColor: "#ECECEC", borderTopWidth: 1 }}>
									<Checkbox value={!!this.state.selects[itit.commodityId]} onChange={v => this.onSelect(itit.commodityId, v)} />
									<Image source={{ uri: itit.thumb }} style={{ width: scale(80), height: scale(80) }} />
									<View>
										<Text>{itit.smallText}</Text>
										<Text>规格: {itit.specificationsValue}</Text>
										<NumberPicker value={itit.count} onChange={v => this.setCount(i, ii, v)} min={itit.min_count} max={itit.max_count} />
									</View>
									<View>
										<Text>¥ {itit.deductPrice}</Text>
										<Text>¥ {itit.price}</Text>
										<TouchableWithoutFeedback>
											<Image source={require("../../images/delete_icon.png")} />
										</TouchableWithoutFeedback>
									</View>
								</View>
							))}
						</View>
					))}
				</ScrollView>
				<View style={{ flexDirection: "row",alignItems:"center",height:scale(60),backgroundColor:"#fff" }}>
					<Checkbox value={this.isSelectGroupAll()} onChange={v => this.onSelectGroupAll(v)} />
					<Text>全选 (0)</Text>
					<Text>¥ 100</Text>
					<Touchable onPress={this.getList().length?this.submit.bind(this):null}>
						<Text>结算</Text>
					</Touchable>
				</View>
			</View>
		);
	}
}