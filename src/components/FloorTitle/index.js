

import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

export default class extends React.Component {
    static propTypes={
        label:PropTypes.string.isRequired,
        RightItem:PropTypes.element
    }
    render() {
        var { label } = this.props
        return (
            <View>
                <Text>{label}</Text>
            </View>
        );
    }
}