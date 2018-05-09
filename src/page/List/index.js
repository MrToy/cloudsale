import React from 'react';
import { Image, Text, View } from 'react-native';
import { scale } from '../../utils/dimension';
import SearchButton from '../Main/SearchButton';

export default class extends React.Component {
    static navigationOptions = {
        title: '分类',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                source={focused ? require('../../images/category_select_icon.png') : require('../../images/category_icon.png')} />
        )
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1' }}>
                <View style={{height:scale(34),alignItems:"center",justifyContent:"center",backgroundColor:"#fff",paddingLeft:scale(11),paddingRight:scale(11)}}>
                    <SearchButton navigation={this.props.navigation} placeholder="酸奶" style={{backgroundColor:"#F3F2F8"}} />
                </View>
                <Text>列表页</Text>
            </View>
        );
    }
}