import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    render() {
        return (
            <Swiper
                autoplay={!__DEV__?true:false}
                showsButtons={false}
                showsPagination={true}
                renderPagination={(index, total, context) => {
                    if (total < 2) return null
                    return (
                        <View style={{ position: "absolute", width: "100%", bottom: scale(17), flexDirection: "row", justifyContent: "center" }}>
                            {Array(total).fill(0).map((_, i) => (
                                <View key={i} style={{ width: scale(8), height: scale(8), borderRadius: scale(8), backgroundColor: index == i ? "#781EFD" : "#fff", marginLeft: i == 0 ? 0 : scale(8) }}></View>
                            ))}
                        </View>
                    )
                }}>
                {this.props.list.map((it, i) => (
                    <FastImage key={i} style={{ width: "100%", height: "100%" }} source={{ uri: it.imageUrl }} />
                ))}
            </Swiper>
        );
    }
}