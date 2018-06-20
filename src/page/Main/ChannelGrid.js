import React from 'react';
import { Image, Text, View } from 'react-native';
import TouchableEx from '../../components/TouchableEx';
import { scale } from '../../utils/dimension';
import ArrowItem from './ArrowItem';

export default class extends React.Component {
    render() {
        var { list,onItemPress } = this.props
        return (
            <View style={{ flexDirection: 'row', justifyContent: "space-between", height: scale(234) }}>
                {list[0] ? (
                    <TouchableEx onPress={()=>onItemPress(list[0].id)}>
                        <View style={{ width: scale(168), height: scale(234), backgroundColor: "#FAF5E2", padding: scale(11) }}>
                            <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: "#C49572" }}>{list[0].name}</Text>
                            <ArrowItem text={list[0].description} color="#C59581" style={{ marginTop: scale(3) }} />
                            <Image style={{ width: scale(146), height: scale(146), marginTop: scale(20) }} source={{ uri: list[0].imageUrl }} />
                        </View>
                    </TouchableEx>
                ) : null}
                <View style={{ width: scale(202), height: scale(234), justifyContent: "space-between" }}>
                    {list[1] ? (
                        <TouchableEx onPress={()=>onItemPress(list[1].id)}>
                            <View style={{ width: scale(202), height: scale(90), backgroundColor: '#FEEAE3', paddingLeft: scale(12), alignItems: "center", flexDirection: 'row', justifyContent: "space-between" }}>
                                <View>
                                    <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: "#E96E47" }}>{list[1].name}</Text>
                                    <ArrowItem text={list[1].description} color="#E2987F" style={{ marginTop: scale(3) }} />
                                </View>
                                <Image style={{ width: scale(90), height: scale(75), marginRight: scale(7) }} source={{ uri: list[1].imageUrl }} />
                            </View>
                        </TouchableEx>
                    ) : null}
                    <View style={{ width: scale(202), height: scale(139), flexDirection: 'row', justifyContent: "space-between" }}>
                        {list[2] ? (
                            <TouchableEx onPress={()=>onItemPress(list[2].id)}>
                                <View style={{ width: scale(100), height: scale(139), backgroundColor: "#FAE4E9", padding: scale(9) }}>
                                    <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: "#E96E47" }}>{list[2].name}</Text>
                                    <ArrowItem text={list[2].description} color="#F58CA9" style={{ marginTop: scale(3) }} />
                                    <Image style={{ width: scale(85), height: scale(69), marginTop: scale(12) }} source={{ uri: list[2].imageUrl }} />
                                </View>
                            </TouchableEx>
                        ) : null}
                        {list[3] ? (
                            <TouchableEx onPress={()=>onItemPress(list[3].id)}>
                                <View style={{ width: scale(95), height: scale(139), backgroundColor: "#E2DAFF", padding: scale(9) }}>
                                    <Text style={{ fontSize: scale(15), lineHeight: scale(21), color: "#7E6ACE" }}>{list[3].name}</Text>
                                    <ArrowItem text={list[3].description} color="#8168E7" style={{ marginTop: scale(3) }} />
                                    <Image style={{ width: scale(81), height: scale(69), marginTop: scale(12) }} source={{ uri: list[3].imageUrl }} />
                                </View>
                            </TouchableEx>
                        ) : null}
                    </View>
                </View>
            </View>
        );
    }
}