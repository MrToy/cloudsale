import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import TouchableEx from '../../components/TouchableEx';
import { scale } from '../../utils/dimension';
import Swiper from '../Main/Swiper';
import CommodityList from '../../components/CommodityList'
import FitImage from 'react-native-fit-image'
import NumberPicker from '../../components/NumberPicker'

const styles = StyleSheet.create({
    selectItem: {
        paddingLeft: scale(11), paddingRight: scale(11), height: scale(23.2), borderColor: "#C8BEDB", borderWidth: 1, justifyContent: "center", borderRadius: scale(2), marginRight: scale(7.7)
    },
    selectItemActive: {
        backgroundColor: "#E339D3", borderColor: "#E339D3"
    },
    selectItemText: {
        fontSize: scale(11), color: "#919191"
    },
    selectItemTextActive: {
        color: "#fff"
    }
})


class InfoCard extends React.Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        color: PropTypes.string,
        noPadding: PropTypes.bool
    }
    render() {
        var { label, color,noPadding } = this.props
        color = color || '#781EFD'
        return (
            <View style={{ marginBottom: scale(6), paddingTop: scale(6), backgroundColor: '#fff' }}>
                <View style={{ borderLeftColor: color, borderLeftWidth: scale(2), height: scale(23), justifyContent: "center" }}>
                    <Text style={{ color, marginLeft: scale(10), fontSize: scale(13) }}>{label}</Text>
                </View>
                <View style={[{ borderTopColor: "#eee", borderTopWidth: 1, marginTop: scale(5) }, !noPadding && { marginRight: scale(12), marginLeft: scale(12),paddingTop: scale(13), paddingBottom: scale(13) }]}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

class BottomBar extends React.Component {
    render() {
        const { onBuy } = this.props
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", height: scale(55), backgroundColor: "#fff" }}>
                <TouchableEx>
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <Image source={require('../../images/my_collection_icon.png')} />
                        <Text style={{ fontSize: scale(12), color: "#F59100", marginTop: scale(3) }}>收藏</Text>
                    </View>
                </TouchableEx>
                <TouchableEx>
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <Image source={require('../../images/contact_icon.png')} />
                        <Text style={{ fontSize: scale(12), color: "#F76F8E", marginTop: scale(3) }}>客服</Text>
                    </View>
                </TouchableEx>
                <View style={{ flexDirection: "row" }}>
                    <TouchableEx>
                        <View style={{ backgroundColor: "#ECE4F8", height: "100%", width: scale(131), justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: scale(15), color: "#781EFD" }}>加入购物车</Text>
                        </View>
                    </TouchableEx>
                    <TouchableEx onPress={onBuy}>
                        <View style={{ backgroundColor: "#781EFD", height: "100%", width: scale(126), justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: scale(15), color: "#fff" }}>立即购买</Text>
                        </View>
                    </TouchableEx>
                </View>
            </View>
        )
    }
}

export default class extends React.Component {
    static navigationOptions = {
        title: '商品详情',
        headerRight: <View />,
    }
    state = {
        detail: {},
        specifica: null,
        selectedNum: 1
    }
    componentDidMount() {
        const id = this.props.navigation.getParam('id')
        this.fetchCommodity(id)
    }
    async fetchCommodity(id) {
        var res = await fetch("https://www.bjzntq.com:8888/Commodity/getCommodityDetail/", {
            method: "POST",
            body: JSON.stringify({
                commodity_id: id
            })
        }).then(res => res.json())
        this.setState({
            specifica: res.data.specifications[0] && res.data.specifications[0].id,
            detail: res.data,
        })
    }
    onBuy(){
        this.props.navigation.navigate('OrderSubmit', { 
            id:this.state.detail.id,
            count:this.state.selectedNum,
            specifica:this.state.specifica
        })
    }
    render() {
        const banner = (this.state.detail.banner || []).map(it => ({
            imageUrl: it.image_url,
            id: it.id
        }))
        const { detail, selectedNum, specifica } = this.state
        return (
            <View style={{ backgroundColor: '#f1f1f1', flex: 1 }}>
                <ScrollView>
                    <View style={{ height: scale(225), marginBottom: scale(5) }}>
                        {banner.length ? (
                            <Swiper list={banner} />
                        ) : null}
                    </View>
                    <View style={{ height: scale(126), backgroundColor: "#fff", paddingBottom: scale(6), paddingLeft: scale(18), paddingRight: scale(10), marginBottom: scale(6) }}>
                        <View style={{ flexDirection: "row", marginTop: scale(7), alignItems: "center" }}>
                            <Text style={{ fontSize: scale(28), color: "#E339D3" }}>¥{detail.deduct_price}</Text>
                            <Text style={{ fontSize: scale(14), marginTop: scale(5), marginLeft: scale(15), color: "#A1A1A1", textDecorationLine: "line-through" }}>¥{detail.original_price}</Text>
                        </View>
                        <Text style={{ fontSize: scale(14), lineHeight: scale(19), marginTop: scale(7), color: "#6A617A" }}>{detail.name}</Text>
                        <Text style={{ marginTop: scale(9), color: "#959595" }}>免邮费</Text>
                    </View>
                    <InfoCard label={`已选 ${selectedNum}个`}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: scale(11) }}>
                            <Text style={{ marginRight: scale(19) }}>规格</Text>
                            {(detail.specifications || []).map(it => (
                                <TouchableEx key={it.id} onPress={() => this.setState({ specifica: it.id })}>
                                    <View style={[styles.selectItem, specifica == it.id && styles.selectItemActive]}>
                                        <Text style={[styles.selectItemText, specifica == it.id && styles.selectItemTextActive]}>{it.value}</Text>
                                    </View>
                                </TouchableEx>
                            ))}
                        </View>
                        <View style={{ flexDirection: "row" , alignItems: "center"}}>
                            <Text style={{ marginRight: scale(19) }}>数量</Text>
                            <NumberPicker value={selectedNum} onChange={val=>this.setState({ selectedNum: val})} />
                        </View>
                    </InfoCard>
                    <InfoCard label="服务">
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {(detail.service || []).map((it,i) => (
                                <Text key={i} style={{ marginRight: scale(10), fontSize: scale(12), color: "#6A617A", lineHeight: scale(22) }}>· {it.service_name}</Text>
                            ))}
                        </View>
                    </InfoCard>
                    <InfoCard label="商铺信息">
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: scale(15) }}>
                            <View style={{ flexDirection: "row", flex: 1 }}>
                                <Image style={{ marginRight: scale(10) }} source={require("../../images/shop_icon.png")} />
                                <Text>{detail.shop_name}</Text>
                            </View>
                            <TouchableEx>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text>进入店铺</Text>
                                    <Image style={{ marginTop: 3 }} source={require("../../images/right_indicator.png")} />
                                </View>
                            </TouchableEx>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text>全部商品：{detail.shop_allgoods_count}</Text>
                            </View>
                            <TouchableEx>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image style={{ marginRight: scale(5) }} source={require("../../images/shop_collection_icon.png")} />
                                    <Text style={{ marginRight: scale(5) }}>收藏店铺</Text>
                                </View>
                            </TouchableEx>
                        </View>
                    </InfoCard>
                    <InfoCard label="猜你喜欢" noPadding>
                        <View style={{backgroundColor:"#f1f1f1"}}>
                        <CommodityList list={(detail.recommend || []).map(it => ({
                            id: it.id,
                            imageUrl: it.image_url,
                            name: it.small_text,
                            price: it.deduct_price
                        }))} />
                        </View>
                    </InfoCard>
                    <InfoCard label="商品介绍" noPadding>
                        {(detail.introduce_images||[]).map((it,i)=>(
                            <FitImage key={i} source={{uri:it.image_url}} />
                        ))}
                    </InfoCard>
                </ScrollView>
                <BottomBar onBuy={this.onBuy.bind(this)} />
            </View>
        );
    }
}