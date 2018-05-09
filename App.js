import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import FootTab from './src/components/FootTab'
import Main from './src/page/Main';
import List from './src/page/List'
import Cart from './src/page/Cart'
import User from './src/page/User'
import Search from './src/page/Search'
import SearchResult from './src/page/SearchResult'

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
})
