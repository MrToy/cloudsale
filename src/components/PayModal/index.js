import React from 'react';
import { Animated, Easing, Image, Modal, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../utils/dimension';
import PropTypes from 'prop-types';

export default class PayModal extends React.Component {
    static propTypes = {
        visible:PropTypes.bool,
        onPay:PropTypes.func,
        onClose:PropTypes.func
    }
    state={
        top:new Animated.Value(190)
    }
    componentDidUpdate(prevProps){
        if(this.props.visible==prevProps.visible){
            return
        }
        if(this.props.visible){
            Animated.timing(this.state.top, {
                toValue: 0,
                duration:200, 
                easing: Easing.easing
            }).start()
        }
    }
    close(){
        Animated.timing(this.state.top, {
            toValue: 190,
            duration: 200, 
            easing: Easing.easing
        }).start(()=>{
            this.props.onClose()
        })
    }
    render() {
        const { visible, onPay }=this.props
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={visible}
            >
                <View style={{ backgroundColor: "rgba(0,0,0,0.25)", height: "100%", justifyContent: "flex-end" }}>
                    <Animated.View style={{ backgroundColor: "#fff", paddingTop: scale(19), paddingLeft: scale(13), paddingRight: scale(13), height: scale(190), transform: [{ translateY: this.state.top }] }}>
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <Text style={{ color: "#6A617A", fontSize: scale(14) }}>请选择支付方式</Text>
                            <Touchable onPress={this.close.bind(this)}>
                                <Image source={require('../../images/delbutton.png')} />
                            </Touchable>
                        </View>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: scale(18) }}>
                            <Touchable onPress={() => onPay("wechat")}>
                                <View style={{ width: scale(150), height: scale(111), backgroundColor: "#F6F6F6", justifyContent: "center", alignItems: "center" }}>
                                    <Image source={require('../../images/wechatpay.png')} />
                                    <Text style={{ fontSize: scale(14), marginTop: scale(8), color: "#6A617A" }}>微信支付</Text>
                                </View>
                            </Touchable>
                            <Touchable onPress={() => onPay("alipay")}>
                                <View style={{ width: scale(150), height: scale(111), backgroundColor: "#F6F6F6", justifyContent: "center", alignItems: "center" }}>
                                    <Image source={require('../../images/alipay.png')} />
                                    <Text style={{ fontSize: scale(14), marginTop: scale(8), color: "#6A617A" }}>支付宝支付</Text>
                                </View>
                            </Touchable>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}
