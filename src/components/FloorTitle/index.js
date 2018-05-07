

import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    static propTypes={
        label:PropTypes.string.isRequired,
        color:PropTypes.string,
        RightItem:PropTypes.element
    }
    render() {
        var { label,color } = this.props
        color=color||'#000'
        return (
            <View style={{borderLeftColor:color,borderLeftWidth:scale(2),height:scale(38),justifyContent:"center",backgroundColor:'#fff'}}>
                <Text style={{color,marginLeft:scale(10)}}>{label}</Text>
            </View>
        );
    }
}