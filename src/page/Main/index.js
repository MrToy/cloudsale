import React from 'react';
import { Image, StatusBar, Text, View,StyleSheet } from 'react-native';
import { scale } from '../../utils/dimension';
import Swiper from './Swiper'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
})

export default class extends React.Component {
	static navigationOptions = {
		title: 'Home',
		headerStyle: {
			backgroundColor: '#781EFD',
			height: scale(65),
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
            fontWeight: 'bold',
            textAlign:'center',
            width:"100%"
		},
	}
	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="rgba(0,0,0,0)" translucent={true} />
                <View style={{ width:"100%", height: scale(163),marginBottom:10 }}>
				    <Swiper />
                </View>
				<View>
					<Text>todo....</Text>
				</View>
			</View>
		);
	}
}