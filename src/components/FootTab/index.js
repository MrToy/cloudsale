import React from 'react';
import { Text, View } from 'react-native';
import { scale } from '../../utils/dimension';
import Touchable from 'react-native-platform-touchable';

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
            <Touchable
                key={route.key}
                onPress={() => onTabPress({route})}
                style={{flex:1}}
            >
                <View style={{alignItems: "center", justifyContent: "center",height:"100%" }}>
                    <View style={{ width: scale(29), height: scale(25), alignItems: "center", marginBottom: scale(2), marginTop: scale(2) }}>
                        {this.props.renderIcon(TabScene)}
                    </View>
                    <Text style={{ color, fontSize: scale(10), textAlign: "center" }}>{this.props.getLabelText(TabScene)}</Text>
                </View>
            </Touchable>
        );
    };
    render() {
        const { navigation } = this.props;
        console.log(this.props)
        const { routes } = navigation.state;
        return (
            <View style={{ flexDirection: 'row', width: "100%", height: scale(49), borderTopColor: '#b2b2b2', borderTopWidth: 0.2, backgroundColor: "rgba(250,250,250,0.90)" }}>
                {routes && routes.map((route, index) => this.renderItem(route, index))}
            </View>
        );
    }
}