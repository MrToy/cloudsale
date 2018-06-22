import React from 'react';
import { Text, View } from 'react-native';
import { scale } from '../../utils/dimension';
import TouchableEx from '../TouchableEx';

export default class extends React.Component {
    renderItem = (route, index) => {
        const {
            navigation,
            onTabPress,
        } = this.props;
        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused: focused,
            route: route,
            tintColor: color
        };
        return (
            <TouchableEx
                key={route.key}
                onPress={() => onTabPress({route})}
            >
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={{ width: scale(29), height: scale(25), alignItems: "center", marginBottom: scale(2), marginTop: scale(2) }}>
                        {this.props.renderIcon(TabScene)}
                    </View>
                    <Text style={{ color, fontSize: scale(10), textAlign: "center" }}>{this.props.getLabelText(TabScene)}</Text>
                </View>
            </TouchableEx>
        );
    };
    render() {
        const { navigation } = this.props;
        console.log(this.props)
        const { routes } = navigation.state;
        return (
            <View style={{ flexDirection: 'row',justifyContent:"space-around", width: "100%", height: scale(49), borderTopColor: '#b2b2b2', borderTopWidth: 0.2, backgroundColor: "rgba(250,250,250,0.90)" }}>
                {routes && routes.map((route, index) => this.renderItem(route, index))}
            </View>
        );
    }
}