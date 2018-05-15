import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    render() {
        return (
            <Swiper
                autoplay={true}
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
                    <Image key={i} style={{ width: "100%", height: "100%" }} source={{ uri: it.imageUrl }} />
                ))}
            </Swiper>
        );
    }
}