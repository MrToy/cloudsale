import md5 from 'md5';
import { Alert } from 'react-native';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';

export async function wechatPay(token, id) {
    var res = await fetch("https://www.bjzntq.com:8888/APP/Pay/AppOrderWxPay/", {
        method: "POST",
        body: JSON.stringify({
            tokeninfo: token,
            order_code: id
        })
    }).then(res => res.json())
    if (res.result != 200) {
        Alert.alert(res.message)
        return
    }
    var _sign = md5(`${res.data.prepayid}${res.data.appid}${res.data.partnerid}${res.data.timestamp}bjzntq2017`)
    if (res.data.sign != _sign) {
        Alert.alert("签名错误")
        return
    }
    try {
        var data = await WeChat.pay({
            partnerId: res.data.partnerid,
            prepayId: res.data.prepayid,
            nonceStr: res.data.noncestr,
            timeStamp: res.data.timestamp,
            package: res.data.package,
            sign: res.data.paySign
        })
    } catch (err) {
        Alert.alert(err.message || "支付失败")
        return
    }
    Alert.alert("支付成功")
}

export async function alipay(token, id) {
    var res = await fetch("https://www.bjzntq.com:8888/APP/Pay/AppOrderAliPay/ ", {
        method: "POST",
        body: JSON.stringify({
            tokeninfo: token,
            order_code: id
        })
    }).then(res => res.json())
    if (res.result != 200) {
        Alert.alert(res.message || "支付失败")
        return
    }
    try {
        var res = await Alipay.pay(res.data)
    } catch (err) {
        Alert.alert(err.message || "支付失败")
        return
    }
    Alert.alert("支付成功")
}