import React from 'react';
import { Image, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../../utils/dimension';
import UserStore from '../../../utils/user';
import ShareModal from '../../../components/ShareModal'

const ListMenuItem = ({ onPress, text, info }) => (
    <Touchable onPress={onPress}>
        <View style={{ height: scale(46), backgroundColor: "#fff", flexDirection: "row", marginTop: 1, alignItems: "center" }}>
            <View style={{ flex: 1 }}>
                <Text style={{ color: "#5E5E5E", fontSize: scale(14), marginLeft: scale(14) }}>{text}</Text>
            </View>
            <Text style={{color:"#5E5E5E",fontSize:scale(12)}}>{info}</Text>
            <Image style={{ marginRight: scale(13) }} source={require('../../../images/right_indicator.png')} />
        </View>
    </Touchable>
)

export default class PageUserSignin extends React.Component {
    static navigationOptions = {
        title: '设置',
        headerRight: <View />,
    }
    state={
        showShare:false,
        shareData:null
    }
    share(){
        var shareData={
            type: 'news', 
            description:"新云零售～",
            webpageUrl:`zntq.xinyun://`
        }
        this.setState({showShare:true,shareData})
    }
    async logout() {
        await UserStore.clearUserInfo()
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%", paddingTop: scale(6) }}>
                <ListMenuItem text="清除缓存" info="3.24M" />
                <ListMenuItem text="联系客服" info="9:00-18:00" />
                <ListMenuItem text="推荐给好友" onPress={this.share.bind(this)} />
                <Touchable onPress={this.logout.bind(this)} style={{height: scale(46), backgroundColor: "#fff", flexDirection: "row", marginTop: scale(20), alignItems: "center",justifyContent:"center"}}>
                    <Text style={{color:"#5E5E5E",fontSize:scale(14)}}>退出登录</Text>
                </Touchable>
                <ShareModal data={this.state.shareData} visible={this.state.showShare} onClose={()=>this.setState({showShare:false})} />
            </View>
        )
    }
}