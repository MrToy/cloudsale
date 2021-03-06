import { observer } from "mobx-react";
import React from 'react';
import LoadImage from '../../components/LoadImage';
import { Alert, Image, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Toast from 'react-native-root-toast';
import Checkbox from '../../components/Checkbox';
import NumberPicker from '../../components/NumberPicker';
import { scale } from '../../utils/dimension';
import request from '../../utils/request';
import UserStore from '../../utils/user';
import {StackActions,NavigationActions} from 'react-navigation'

class CartPage extends React.Component {
	static navigationOptions = {
		title: '购物车',
		tabBarIcon: ({ focused }) => (
			<Image style={{ marginRight: 3 }} source={focused ? require('../../images/cart_select_icon.png') : require('../../images/cart_icon.png')} />
		),
	}
	state = {
		list: [],
		selects: {}
	}
	componentDidMount() {
		this._subscribe = this.props.navigation.addListener("didFocus", () => {
			this.fetchList()
		})
	}
	componentWillUnmount() {
		this._subscribe.remove()
	}
	async fetchList() {
		var user = UserStore.user
		if (!user) {
			return
		}
		var res = await fetch("https://www.xinyun.shop:8888/Commodity/getCartCommodity/", {
			method: "POST",
			body: JSON.stringify({
				tokeninfo: user.tokeninfo,
			})
		}).then(res => res.json())
		this.setState({ list: res.data || [] })
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
		if (!this.state.list[n].goodsList.length) {
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
		if (!this.state.list.length) {
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
	getSelectList() {
		var selects = this.state.selects
		var list = []
		for (let j = 0; j < this.state.list.length; j++) {
			for (let i = 0; i < this.state.list[j].goodsList.length; i++) {
				if (selects[this.state.list[j].goodsList[i].commodityId]) {
					list.push(this.state.list[j].goodsList[i])
				}
			}
		}
		return list
	}
	getSelectListLength(){
		var i=0
		var list=this.getSelectList()
		list.forEach(it=>{
			i+=it.count||0
		})
		return i
	}
	getSelectPrice() {
		var list = this.getSelectList()
		return list.map(it => (it.deductPrice || 0) * it.count).reduce(((a, b) => a + b), 0).toFixed(2)
	}
	submit() {
		var selects = this.state.selects
		var list = []
		for (let j = 0; j < this.state.list.length; j++) {
			let goodsList = []
			for (let i = 0; i < this.state.list[j].goodsList.length; i++) {
				if (selects[this.state.list[j].goodsList[i].commodityId]) {
					goodsList.push(this.state.list[j].goodsList[i])
				}
			}
			if (goodsList.length) {
				list.push({
					...this.state.list[j],
					goodsList
				})
			}
		}
		if (!list.length) {
			Toast.show("请选择商品", {
				position: Toast.positions.CENTER
			})
			return
		}
		this.props.navigation.navigate('OrderSubmit', { list })
	}
	onRemoveItem(id) {
		Alert.alert("确认删除?", null, [
			{ text: "取消" },
			{
				text: "确定", onPress: () => {
					this.removeItem(id)
				}
			}
		])
	}
	async removeItem(id) {
		var res = await request('https://www.xinyun.shop:8888/Commodity/deleteCartCommodity/', {
			"tokeninfo": UserStore.user.tokeninfo,
			"cart_id": id
		})
		this.fetchList()
		Toast.show(res.message, {
			position: Toast.positions.CENTER
		})
	}
	goHome(){
		this.props.navigation.dispatch(StackActions.reset({ 
            index: 0, 
            actions: [NavigationActions.navigate({ routeName: 'Home' })], 
        }))
	}
	render() {
		if (!this.state.list.length) {
			return (
				<View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
					<Image source={require('../../images/empty_cart.png')} />
					<View style={{ paddingHorizontal: scale(20),width:"100%" }}>
						<Touchable style={{ width: "100%", height: scale(42), borderRadius: scale(21), backgroundColor: "#781EFD", justifyContent: "center", alignItems: "center", marginTop: scale(14) }} onPress={this.goHome.bind(this)}>
							<Text style={{ color: "#fff", fontSize: scale(15) }}>去逛逛～</Text>
						</Touchable>
					</View>
				</View>
			)
		}
		return (
			<View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
				<ScrollView style={{ flex: 1, margin: scale(5) }}>
					{this.state.list.map((it, i) => (
						<View key={i} style={{ backgroundColor: "#fff", marginBottom: scale(5) }}>
							<View style={{ flexDirection: "row", alignItems: "center", height: scale(39), paddingLeft: scale(10) }}>
								<Checkbox value={this.isSelectAll(i)} onChange={v => this.onSelectAll(i, v)} />
								<Text style={{ marginLeft: scale(8) }}>{it.shopName}</Text>
							</View>
							{it.goodsList.map((itit, ii) => (
								<TouchableWithoutFeedback key={ii} onPress={() => this.props.navigation.push('Detail', { id: itit.commodityId })}>
									<View style={{ flexDirection: "row", alignItems: "center", borderTopColor: "#ECECEC", borderTopWidth: 1, padding: scale(10) }}>
										<Checkbox value={!!this.state.selects[itit.commodityId]} onChange={v => this.onSelect(itit.commodityId, v)} />
										<LoadImage source={{ uri: itit.thumb }} style={{ width: scale(80), height: scale(80), marginLeft: scale(10), marginRight: scale(8) }} />
										<View style={{ height: "100%", flex: 1 }}>
											<Text numLines={2} style={{ fontSize: scale(12), color: '#6A617A', height: scale(32), width: scale(145) }} numberOfLines={2}>{itit.smallText}</Text>
											<Text style={{ fontSize: scale(11), color: '#989898', marginTop: 1, flex: 1 }}>规格: {itit.specificationsValue}</Text>
											<NumberPicker value={itit.count} onChange={v => this.setCount(i, ii, v)} min={itit.min_count} max={itit.max_count} />
										</View>
										<View style={{ height: "100%", alignItems: "flex-end", justifyContent: "flex-start" }}>
											<Text style={{ fontSize: scale(12), color: "#E339D3" }}>
												<Text>¥ </Text>
												<Text style={{ fontSize: scale(15) }}>{(itit.deductPrice*itit.count).toFixed(2)}</Text>
											</Text>
											<Text style={{ fontSize: scale(11), color: "#A1A1A1", flex: 1, textDecorationLine: "line-through" }}>¥ {(itit.price*itit.count).toFixed(2)}</Text>
											<TouchableWithoutFeedback onPress={() => this.onRemoveItem(itit.card_id)}>
												<Image source={require("../../images/delete_icon.png")} />
											</TouchableWithoutFeedback>
										</View>
									</View>
								</TouchableWithoutFeedback>
							))}
						</View>
					))}
				</ScrollView>
				<View style={{ flexDirection: "row", alignItems: "center", height: scale(60), backgroundColor: "#fff", padding: scale(10) }}>
					<Checkbox value={this.isSelectGroupAll()} onChange={v => this.onSelectGroupAll(v)} />
					<Text style={{ fontSize: scale(15), color: '#6A617A', marginLeft: scale(11), flex: 1 }}>全选 ({this.getSelectListLength()})</Text>
					<Text style={{ fontSize: scale(17), color: '#E339D3', marginRight: scale(17) }}>¥ {this.getSelectPrice()}</Text>
					<Touchable onPress={this.submit.bind(this)} style={{ justifyContent: "center", alignItems: "center", width: scale(68), height: scale(31), backgroundColor: "#781efd", borderRadius: scale(4) }}>
						<Text style={{ color: "#fff" }}>结算</Text>
					</Touchable>
				</View>
			</View>
		);
	}
}

export default observer(CartPage)