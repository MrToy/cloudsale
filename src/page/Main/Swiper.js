

import React from 'react';
import { Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    render() {
        return (
            <Swiper
                activeDotColor="#781EFD"
                showsButtons={false}
                showsPagination={true}>
                <Image style={{ width: "100%", height: "100%" }} source={{ uri: 'https://img13.joybuy.com/tuangou/jfs/t17401/254/2246754990/101991/13c95f27/5aeac8a0N9e6d9484.png' }} />
                <Image style={{ width: "100%", height: "100%" }} source={{ uri: 'https://img10.joybuy.com/tuangou/jfs/t18181/125/2203569494/206269/23479979/5aeac8d6N15278523.png' }} />
                <Image style={{ width: "100%", height: "100%" }} source={{ uri: 'https://img13.joybuy.com/tuangou/jfs/t17347/359/2184670377/214148/2beeb82f/5aea83ddN3d4b65ec.png' }} />
            </Swiper>
        );
    }
}