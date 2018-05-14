

import React from 'react';
import { Image } from 'react-native';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';

export default class extends React.Component {
    render() {
        return (
            <Swiper
                activeDotColor="#781EFD"
                dotColor="#fff"
                autoplay={true}
                showsButtons={false}
                showsPagination={true}>
                {this.props.list.map((it,i)=>(
                    <Image key={i} style={{ width: "100%", height: "100%" }} source={{ uri:it.imageUrl}} />
                ))}
            </Swiper>
        );
    }
}