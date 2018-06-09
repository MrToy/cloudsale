import PropTypes from 'prop-types';
import React from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native'

export default class extends React.Component {
    static propTypes = {
        value: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
    }
    render() {
        var { value, onChange } = this.props
        return (
            <TouchableWithoutFeedback onPress={() => onChange(!value)}>
                <View style={{ width: 20, height: 20 }}>
                    {value ? (
                        <Image style={{ width: "100%", height: "100%" }} source={require("../../images/item_select.png")} />
                    ) : (
                            <Image style={{ width: "100%", height: "100%" }} source={require("../../images/item_unselect.png")} />
                        )}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}