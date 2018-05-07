import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Tabs from './src/components/Tabs'
import Main from './src/page/Main';
import List from './src/page/List'
import Cart from './src/page/Cart'
import User from './src/page/User'

console.disableYellowBox = true;

const TabScreens = TabNavigator({
	Tab1: { screen: Main },
	Tab2: { screen: List },
	Tab3: { screen: Cart },
	Tab4: { screen: User },
}, {
		tabBarPosition: 'bottom',
		tabBarComponent:Tabs,
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
})
