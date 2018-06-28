import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { scale } from '../../utils/dimension';


const KeywordList = ({list,onItemPress}) => (
    <View style={{ marginLeft: scale(17), marginRight: scale(17), marginBottom: scale(11), flexDirection: "row", flexWrap: "wrap" }}>
        {list.map((text,i) => (
            <Touchable onPress={()=>onItemPress(text)} key={i}>
                <View style={{ height: scale(24), paddingLeft: scale(10), paddingRight: scale(10), backgroundColor: "#f3f2f8", borderColor: "#ECECEC", borderWidth: 1, borderRadius: scale(3), marginRight: scale(8), marginBottom: scale(11), justifyContent: "center" }}>
                    <Text style={{ color: "#6A617A", fontSize: scale(11) }}>{text}</Text>
                </View>
            </Touchable>
        ))}
    </View>
)

export default class extends React.Component {
    static navigationOptions = {
        title: '搜索',
        headerRight: <View />,
    }
    state = {
        searchKey: "",
        historyList: ["西瓜", "牛奶", "进口零食", "西瓜", "牛奶", "进口零食"],
        hostList: ["酸奶", "牛奶", "奥利奥", "面包", "三只松鼠", "进口零食"]
    }
    onSearch() {
        this.onSearchWord(this.state.searchKey)
    }
    onSearchWord(keyword){
        this.props.navigation.navigate('SearchResult', { keyword})
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1', height: "100%" }}>
                <View style={{ height: scale(34), flexDirection: 'row', alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingLeft: scale(11), paddingRight: scale(11) }}>
                    <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: "#F3F2F8", borderRadius: scale(14), height: scale(28), flex: 1 }}>
                        <Image style={{ marginLeft: scale(9) }} source={require('../../images/search_icon.png')} />
                        <TextInput
                            style={{ flex: 1, fontSize: scale(12), paddingTop: 0, paddingBottom: 0, paddingLeft: scale(8), paddingRight: scale(8), color: "#6A617A" }}
                            autoFocus
                            value={this.state.searchKey}
                            onChangeText={text => this.setState({ searchKey: text })}
                            underlineColorAndroid='transparent'
                            returnKeyType="search"
                            placeholder="搜索商品"
                            onSubmitEditing={this.onSearch.bind(this)} />
                    </View>
                    {this.state.searchKey ? (
                        <TouchableWithoutFeedback onPress={this.onSearch.bind(this)}>
                            <View style={{ marginLeft: scale(6), width: scale(38), height: scale(24), borderRadius: scale(3), backgroundColor: '#F3F2F8', alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: '#ECECEC' }}>
                                <Text style={{ fontSize: scale(11), color: '#6A617A' }}>搜索</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : (
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                                <View style={{ marginLeft: scale(6), width: scale(38), height: scale(24), borderRadius: scale(3), backgroundColor: '#F3F2F8', alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: '#ECECEC' }}>
                                    <Text style={{ fontSize: scale(11), color: '#6A617A' }}>取消</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                </View>
                <ScrollView style={{ backgroundColor: "#fff", marginTop: 1, paddingTop: scale(7), paddingBottom: scale(7) }}>
                    <View style={{ marginLeft: scale(14), marginRight: scale(14), flexDirection: "row", alignItems: "center", marginBottom: scale(10) }}>
                        <Text style={{ color: "#6A617A", fontSize: scale(13), flex: 1 }}>历史搜索</Text>
                        <Touchable>
                            <Text style={{ color: "#E339D3", fontSize: scale(12) }}>清除</Text>
                        </Touchable>
                    </View>
                    <KeywordList list={this.state.historyList} onItemPress={word=>this.onSearchWord(word)} />
                    <View style={{ marginLeft: scale(14), marginRight: scale(14), flexDirection: "row", alignItems: "center", marginBottom: scale(10) }}>
                        <Text style={{ color: "#6A617A", fontSize: scale(13), flex: 1 }}>热门搜索</Text>
                        <Touchable>
                            <Text style={{ color: "#E339D3", fontSize: scale(12) }}>换一批</Text>
                        </Touchable>
                    </View>
                    <KeywordList list={this.state.hostList} onItemPress={word=>this.onSearchWord(word)} />
                </ScrollView>
            </View>
        );
    }
}