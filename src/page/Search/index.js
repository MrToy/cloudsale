import React from 'react';
import { Text, View, TextInput, Image,Button,TouchableWithoutFeedback } from 'react-native';
import SearchButton from '../Main/SearchButton'
import { scale } from '../../utils/dimension';


export default class extends React.Component {
    static navigationOptions = {
        title: '搜索',
        headerRight: () => { },
    }
    state = {
        searchKey: ""
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1' }}>
                <View style={{ height: scale(34),flexDirection: 'row', alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingLeft: scale(11), paddingRight: scale(11) }}>
                    <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: "#F3F2F8", borderRadius: scale(14), height: scale(28),flex:1 }}>
                        <Image style={{ marginLeft: scale(9) }} source={require('../../images/search_icon.png')} />
                        <TextInput
                            style={{flex:1,fontSize:scale(12),paddingTop:0,paddingBottom:0,paddingLeft:scale(8),paddingRight:scale(8),color:"#6A617A"}}
                            autoFocus
                            value={this.state.searchKey}
                            onChange={v => this.setState({ searchKey: v })}
                            underlineColorAndroid='transparent' />
                    </View>
                    <TouchableWithoutFeedback>
                        <View style={{marginLeft:scale(6),width:scale(38),height:scale(24),borderRadius:scale(3),backgroundColor:'#F3F2F8',alignItems: "center", justifyContent: "center",borderWidth:1,borderColor:'#ECECEC'}}>
                            <Text style={{fontSize:scale(11),color:'#6A617A'}}>搜索</Text>
                        </View>
                    </TouchableWithoutFeedback>  
                </View>
            </View>
        );
    }
}