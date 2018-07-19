import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../utils/dimension';
import BottomModal from '../BottomModal';

export default class PayModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onPay: PropTypes.func,
        onClose: PropTypes.func
    }
    render() {
        const { visible, onClose, onPay } = this.props
        return (
            <BottomModal visible={visible} onClose={onClose}>
                <View style={{paddingTop:scale(19),paddingHorizontal:scale(13),paddingBottom:scale(22)}}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={{ color: "#6A617A", fontSize: scale(14) }}>请选择支付方式</Text>
                        <Touchable onPress={onClose}>
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
                </View>
            </BottomModal>
        )
    }
}
