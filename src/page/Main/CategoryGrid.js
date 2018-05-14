

import React from 'react';
import { Image, Text, View } from 'react-native';
import TouchableEx from '../../components/TouchableEx';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    render() {
        var { list } = this.props
        return (
            <View style={{ flexDirection: 'row', justifyContent: "space-between", height: scale(234) }}>
                {list[0] ? (
                    <TouchableEx>
                        <View style={{ width: scale(168), height: scale(234),backgroundColor:"#FAF5E2" }}>
                            <Image style={{ width: scale(25), height: scale(25), marginBottom: scale(7) }} source={{ uri: list[0].imageUrl }} />
                            <Text style={{ fontSize: scale(10) }}>{list[0].name}</Text>
                        </View>
                    </TouchableEx>
                ) : null}
                <View style={{ width: scale(202), height: scale(234), justifyContent: "space-between" }}>
                    {list[1] ? (
                        <TouchableEx>
                            <View style={{ width: scale(202), height: scale(90),backgroundColor:'#FEEAE3' }}>
                                <Image style={{ width: scale(25), height: scale(25), marginBottom: scale(7) }} source={{ uri: list[1].imageUrl }} />
                                <Text style={{ fontSize: scale(10) }}>{list[1].name}</Text>
                            </View>
                        </TouchableEx>
                    ) : null}
                    <View style={{width: scale(202), height: scale(139),flexDirection: 'row', justifyContent: "space-between"}}>
                        {list[2] ? (
                            <TouchableEx>
                                <View style={{ width: scale(100), height: scale(139),backgroundColor:"#FAE4E9" }}>
                                    <Image style={{ width: scale(25), height: scale(25), marginBottom: scale(7) }} source={{ uri: list[2].imageUrl }} />
                                    <Text style={{ fontSize: scale(10) }}>{list[2].name}</Text>
                                </View>
                            </TouchableEx>
                        ) : null}
                        {list[3] ? (
                            <TouchableEx>
                                <View style={{ width: scale(95), height: scale(139),backgroundColor:"#E2DAFF" }}>
                                    <Image style={{ width: scale(25), height: scale(25), marginBottom: scale(7) }} source={{ uri: list[3].imageUrl }} />
                                    <Text style={{ fontSize: scale(10) }}>{list[3].name}</Text>
                                </View>
                            </TouchableEx>
                        ) : null}
                    </View>
                </View>
            </View>
        );
    }
}