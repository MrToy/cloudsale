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
        Toast.show(res.message,{
            position:Toast.positions.CENTER
        })
        return
    }
    wechatByInfo(res.data)
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
        Toast.show(res.message,{ 
            position:Toast.positions.CENTER 
        }) 
        return 
    } 
    alipayByInfo(res.data)
}

export async function alipayByInfo(data) {
    await Alipay.pay(data)
}

export async function wechatByInfo(data) {
    var _sign = md5(`${data.prepayid}${data.appid}${data.partnerid}${data.timestamp}bjzntq2017`)
    if (data.sign != _sign) {
        Toast.show("签名错误",{
            position:Toast.positions.CENTER
        })
        return
    }
    try {
        await WeChat.pay({
            partnerId: data.partnerid,
            prepayId: data.prepayid,
            nonceStr: data.noncestr,
            timeStamp: data.timestamp,
            package: data.package,
            sign: data.paySign
        })
    } catch (err) {
        if(err.code==-2){
            return
        }
        Toast.show(err.message,{
            position:Toast.positions.CENTER
        })
        return
    }
    Toast.show("支付成功")
}