

import React from 'react';
import { Image, Text, View } from 'react-native';
import TouchableEx from '../../components/TouchableEx';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    render() {
        var { list,navigation } = this.props
        return (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {list.map((it, i) => (
                    <TouchableEx key={i} onPress={()=>navigation.navigate('SearchResult')}>
                        <View style={{ width: "20%", height: "50%", alignItems: "center", justifyContent: "center" }}>
                            <Image style={{ width: scale(25), height: scale(25), marginBottom: scale(7) }} source={{uri:it.imageUrl}} />
                            <Text style={{ fontSize: scale(10) }}>{it.name}</Text>
                        </View>
                    </TouchableEx>
                ))}
            </View>
        );
    }
}