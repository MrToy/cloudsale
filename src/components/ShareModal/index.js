import React from 'react';
import { Image, Text, View, StyleSheet ,Clipboard} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../utils/dimension';
import BottomModal from '../BottomModal';
import Toast from 'react-native-root-toast';
import * as WeChat from 'react-native-wechat';

const styles = StyleSheet.create({
    iconText: {
        fontSize: scale(14), marginTop: scale(8), color: "#6A617A"
    },
    touchBox:{
        flex:1,alignItems:"center",justifyContent:"center",height:"100%"
    }
})

export default class PayModal extends React.Component {
    onShare(type) {
        var shareData=this.props.data
        if(!shareData){
            return
        }
        switch(type){
            case 1:{
                WeChat.shareToSession(shareData)
                break;
            }
            case 2:{
                WeChat.shareToTimeline(shareData)
                break;
            }
            case 3:{
                Clipboard.setString(shareData.webpageUrl)
                Toast.show("复制成功～", {
                    position: Toast.positions.CENTER
                })
                break;
            }
        }
        
        // WeChat.shareToTimeline
    }
    render() {
        const { visible, onClose } = this.props
        return (
            <BottomModal visible={visible} onClose={onClose}>
                <View style={{ alignItems: "center", height: scale(40), justifyContent: "center", borderBottomColor: "#F6F6F6", borderBottomWidth: 1 }}>
                    <Text style={{ color: "#6A617A", fontSize: scale(14) }}>选择分享方式</Text>
                </View>
                <View style={{ height: scale(126), justifyContent: "space-around", alignItems: "center", flexDirection: "row" }}>
                    <Touchable onPress={() => this.onShare(1)} style={styles.touchBox}>
                        <View>
                            <Image source={require('../../images/wechat-share.png')} />
                            <Text style={styles.iconText}>微信好友</Text>
                        </View>
                    </Touchable>
                    <Touchable onPress={() => this.onShare(2)} style={styles.touchBox}>
                        <View>
                            <Image source={require('../../images/friends-circle.png')} />
                            <Text style={styles.iconText}>微信朋友圈</Text>
                        </View>
                    </Touchable>
                    <Touchable onPress={() => this.onShare(3)} style={styles.touchBox}>
                        <View>
                            <Image source={require('../../images/copy-link.png')} />
                            <Text style={styles.iconText}>复制链接</Text>
                        </View>
                    </Touchable>
                </View>
            </BottomModal>
        )
    }
}
