import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import FootTab from './src/components/FootTab'
import Main from './src/page/Main';
import List from './src/page/List'
import Cart from './src/page/Cart'
import User from './src/page/User'
import Search from './src/page/Search'
import SearchResult from './src/page/SearchResult'
import {scale} from './src/utils/dimension'

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
