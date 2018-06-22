import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import * as WeChat from 'react-native-wechat'
import FootTab from './src/components/FootTab';
import { scale } from './src/utils/dimension';
import { initUser } from './src/utils/user'
import Cart from './src/page/Cart';
import List from './src/page/List';
import Main from './src/page/Main';
import Search from './src/page/Search';
import SearchResult from './src/page/SearchResult';
import User from './src/page/User';
import AboutUs from './src/page/AboutUs'
import Feedback from './src/page/Feedback'
import Detail from './src/page/Detail'
import OrderSubmit from './src/page/OrderSubmit'
import UserOrder from './src/page/User/Order'
import UserLogin from './src/page/User/Login'
import UserSignin from './src/page/User/Signin'

console.disableYellowBox = true;

const TabScreens = createBottomTabNavigator({
	Main: { screen: Main },
	List: { screen: List },
	Cart: { screen: Cart },
	User: { screen: User },
}, {
		tabBarPosition: 'bottom',
		tabBarComponent: FootTab,
		swipeEnabled: false,
		animationEnabled: false,
		lazy: true,
		tabBarOptions: {
			activeTintColor: "#781EFD",
			inactiveTintColor: "#6A617A"
		}
	})

TabScreens.navigationOptions = ({ navigation }) => {
	const component = TabScreens.router.getComponentForState(navigation.state);
	if (typeof component.navigationOptions === 'function') {
		return component.navigationOptions({ navigation });
	}
	return component.navigationOptions;
}



const Routes = createStackNavigator({
	Home: {
		screen: TabScreens,
	},
	Search: {
		screen: Search
	},
	SearchResult: {
		screen: SearchResult
	},
	AboutUs: {
		screen: AboutUs
	},
	Feedback: {
		screen: Feedback
	},
	Detail: {
		screen: Detail
	},
	OrderSubmit: {
		screen: OrderSubmit
	},
	UserOrder: {
		screen: UserOrder
	},
	UserLogin: {
		screen: UserLogin
	},
	UserSignin: {
		screen: UserSignin
	}
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
			}
		}
	})

export default class extends React.Component {
	componentDidMount() {
		initUser()
		WeChat.registerApp('wxd71c7825d6c2ecdd')
	}
	render() {
		return <Routes />
	}
}