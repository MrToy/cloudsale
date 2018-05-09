

import React from 'react';
import { Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import { scale } from '../../utils/dimension';

export default class extends React.Component {
    state = {
        navs: [
            { text: '休闲食品', image: require('../../images/category_icon1.png') },
            { text: '水饮牛奶', image: require('../../images/category_icon2.png') },
            { text: '生鲜果蔬', image: require('../../images/category_icon3.png') },
            { text: '美妆护肤', image: require('../../images/category_icon4.png') },
            { text: '个人护理', image: require('../../images/category_icon5.png') },
            { text: '家居百货', image: require('../../images/category_icon6.png') },
            { text: '清洁用品', image: require('../../images/category_icon7.png') },
            { text: '电子配件', image: require('../../images/category_icon8.png') },
            { text: '跳蚤市场', image: require('../../images/category_icon9.png') },
            { text: '全部分类', image: require('../../images/category_icon10.png') },
        ]
    }
    render() {
        var { navs } = this.state
        return (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {navs.map((it, i) => (
                    <TouchableWithoutFeedback key={i}>
                        <View style={{ width: "20%", height: "50%", alignItems: "center", justifyContent: "center" }}>
                            <Image style={{ width: scale(25), height: scale(25), marginBottom: scale(7) }} source={it.image} />
                            <Text style={{ fontSize: scale(10) }}>{it.text}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        );
    }
}