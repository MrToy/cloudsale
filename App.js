import React from 'react';
import * as WeChat from 'react-native-wechat';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import {Image} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { scale } from './src/utils/dimension';
import AboutUs from './src/page/AboutUs';
import Cart from './src/page/Cart';
import Detail from './src/page/Detail';
import Feedback from './src/page/Feedback';
import List from './src/page/List';
import Main from './src/page/Main';
import OrderSubmit from './src/page/OrderSubmit';
import Search from './src/page/Search';
import SearchResult from './src/page/SearchResult';
import User from './src/page/User';
import UserLogin from './src/page/User/Login';
import UserOrder from './src/page/User/Order';
import UserSetting from './src/page/User/Setting';
import UserSignin from './src/page/User/Signin';
import UserAddress from './src/page/User/Address'
import UserNewAddress from './src/page/User/Address/NewAddress'
import UserEditAddress from './src/page/User/Address/EditAddress'
import Ticketing from './src/page/Ticketing'
import UserMessage from './src/page/User/Message'
import UserFavor from './src/page/User/Favor'
import UserFootprint from './src/page/User/Footprint'
import TicketingList from './src/page/TicketingList'


console.disableYellowBox = true;

const TabScreens = createBottomTabNavigator({
	Main,
	List,
	Cart,
	User,
}, {
		tabBarPosition: 'bottom',
		swipeEnabled: false,
		animationEnabled: false,
		lazy: true,
		tabBarOptions: {
			activeTintColor: "#781EFD",
			inactiveTintColor: "#6A617A"
		},
	})


TabScreens.navigationOptions = ({ navigation }) => {
	const component = TabScreens.router.getComponentForState(navigation.state);
	if (typeof component.navigationOptions === 'function') {
		return component.navigationOptions({ navigation });
	}
	return component.navigationOptions;
}



const Routes = createStackNavigator({
	Home: TabScreens,
	Search,
	SearchResult,
	AboutUs,
	Feedback,
	Detail,
	OrderSubmit,
	UserOrder,
	UserLogin,
	UserSignin,
	UserSetting,
	UserAddress,
	UserNewAddress,
	UserEditAddress,
	UserMessage,
	UserFavor,
	UserFootprint,
	Ticketing,
	TicketingList,
}, {
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#781EFD',
				height: scale(45),
				elevation: 0
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				flex: 1,
				fontSize: scale(17)
			},
			headerBackTitle:null,
			headerBackImage:<Image style={{marginLeft:scale(16)}} source={require('./src/images/back_icon.png')} />
		}
	})

export default class extends React.Component {
	componentDidMount() {
		WeChat.registerApp('wxd71c7825d6c2ecdd')
		SplashScreen.hide()
	}
	render() {
		return <Routes />
	}
}