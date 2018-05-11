import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import TouchableNativeFeedbackEx from '../TouchableNativeFeedbackEx';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    renderItem = (route, index, total) => {
        const {
            navigation,
            jumpToIndex,
        } = this.props;
        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused: focused,
            route: route,
            tintColor: color
        };
        return (
            <TouchableNativeFeedbackEx
                key={route.key}
                onPress={() => jumpToIndex(index)}
            >
                <View style={{ width: 100 / total + '%', alignItems: "center", justifyContent: "center" }}>
                    <View style={{ width: scale(29), height: scale(25), alignItems: "center", marginBottom: scale(2), marginTop: scale(2) }}>
                        {this.props.renderIcon(TabScene)}
                    </View>
                    <Text style={{ color, fontSize: scale(10), textAlign: "center" }}>{this.props.getLabel(TabScene)}</Text>
                </View>
            </TouchableNativeFeedbackEx>
        );
    };
    render() {
        const { navigation } = this.props;
        const { routes } = navigation.state;
        return (
            <View style={{ flexDirection: 'row', width: "100%", height: scale(49), borderTopColor: '#b2b2b2', borderTopWidth: 0.5, backgroundColor: "rgba(250,250,250,0.90)" }}>
                {routes && routes.map((route, index) => this.renderItem(route, index, routes.length))}
            </View>
        );
    }
}