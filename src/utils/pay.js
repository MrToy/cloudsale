import md5 from 'md5';
import Toast from 'react-native-root-toast';
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
        Toast.show(res.message, {
            position: Toast.positions.CENTER
        })
        return
    }
    var _sign=md5(`${res.data.prepay_id}${res.data.appId}${res.data.partnerid}${res.data.timeStamp}bjzntq2017`)
    if(res.data.sign!=_sign){
        Toast.show("签名错误", {
            position: Toast.positions.CENTER
        })
        return
    }
    try {
        var data = await WeChat.pay({
            partnerId: res.data.partnerid,
            prepayId: res.data.prepay_id,
            nonceStr: res.data.nonceStr,
            timeStamp: res.data.timeStamp,
            package: "Sign=WXPay",
            sign: res.data.paySign
        })
    } catch (err) {
        Toast.show(err.message, {
            position: Toast.positions.CENTER
        })
    }
    console.log(data)
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
        Toast.show(res.message, {
            position: Toast.positions.CENTER
        })
        return
    }
    var res = Alipay.pay(res.data)
}