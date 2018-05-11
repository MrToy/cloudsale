import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import FootTab from './src/components/FootTab';
import { scale } from './src/utils/dimension';
import Cart from './src/page/Cart';
import List from './src/page/List';
import Main from './src/page/Main';
import Search from './src/page/Search';
import SearchResult from './src/page/SearchResult';
import User from './src/page/User';
import AboutUs from './src/page/AboutUs'
import Feedback from './src/page/Feedback'


console.disableYellowBox = true;

const TabScreens = TabNavigator({
	Main: { screen: Main },
	List: { screen: List },
	Cart: { screen: Cart },
	User: { screen: User },
}, {
		tabBarPosition: 'bottom',
		tabBarComponent:FootTab,
		swipeEnabled:false,
		animationEnabled:false,
		lazy:true,
		tabBarOptions:{
			activeTintColor:"#781EFD",
			inactiveTintColor:"#6A617A"
		}
	})



export default StackNavigator({
	Home: {
		screen: TabScreens,
	},
	Search:{
		screen:Search
	},
	SearchResult:{
		screen:SearchResult
	},
	AboutUs:{
		screen:AboutUs
	},
	Feedback:{
		screen:Feedback
	}
},{
	navigationOptions:{
		headerStyle: {
			backgroundColor: '#781EFD',
			height: scale(45),
			elevation:0
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
