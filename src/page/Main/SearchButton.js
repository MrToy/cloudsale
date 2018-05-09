

import PropTypes from 'prop-types';
import React from 'react';
import { Text, View,Image,TouchableNativeFeedback } from 'react-native';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    static propTypes={
        placeholder:PropTypes.string,
        style:PropTypes.object,
        navigation:PropTypes.object.isRequired
    }
    render() {
        const {placeholder,style,navigation}=this.props
        return (
            <TouchableNativeFeedback onPress={()=>navigation.navigate('Search')}>
                <View style={[{flexDirection: 'row',alignItems:"center",backgroundColor:"rgba(255,255,255,0.69)",borderRadius:scale(14),height:scale(28),width:"100%"},style]}>
                    <Image style={{marginLeft:scale(9)}} source={require('../../images/search_icon.png')} />
                    <Text style={{fontSize:scale(12),marginLeft:scale(8),color:"#A4A0AA"}}>{placeholder}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}