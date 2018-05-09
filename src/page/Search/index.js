import React from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import headerStyle from '../../components/Header/style';
import SearchButton from '../Main/SearchButton'
import { scale } from '../../utils/dimension';


export default class extends React.Component {
    static navigationOptions = {
        title: '搜索',
        headerRight: () => { },
        ...headerStyle
    }
    state = {
        searchKey: ""
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1' }}>
                <View style={{ height: scale(34), alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingLeft: scale(11), paddingRight: scale(11) }}>
                    <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: "#F3F2F8", borderRadius: scale(14), height: scale(28), width: "100%" }}>
                        <Image style={{ marginLeft: scale(9) }} source={require('../../images/search_icon.png')} />
                        <TextInput
                            style={{fontSize:scale(12),padding:0,marginLeft:scale(8),color:"#6A617A"}}
                            autoFocus
                            value={this.state.searchKey}
                            onChange={v => this.setState({ searchKey: v })}
                            underlineColorAndroid='transparent' />
                    </View>
                </View>
            </View>
        );
    }
}