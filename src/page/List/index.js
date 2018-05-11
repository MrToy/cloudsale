import React from 'react';
import { Image, Text, View, ScrollView, StyleSheet } from 'react-native';
import TouchableNativeFeedbackEx from '../../components/TouchableNativeFeedbackEx';
import { scale } from '../../utils/dimension';
import SearchButton from '../Main/SearchButton';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1', height: "100%"
    },
    searchBarBox: {
        height: scale(34), alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingLeft: scale(11), paddingRight: scale(11)
    },
    listBox: {
        flexDirection: 'row', flex: 1
    },
    leftBox: {
        width: scale(71), backgroundColor: "#F1F0F5"
    },
    rightBox: {
        width: scale(71), flex: 1, backgroundColor: "#fff",paddingLeft:10,paddingRight:10,paddingTop:3,paddingBottom:3
    },
    menuItem:{
        borderBottomColor: "#E9E8ED", borderBottomWidth: 1, height: scale(40), alignItems: "center", justifyContent: "center"
    },
    menuItemActive:{
        backgroundColor:"#fff"
    },
    menuItemText:{
        color:"#6A617A",fontSize:scale(11)
    },
    menuItemTextActive:{
        color:"#781EFD"
    },
})


class ListMenu extends React.Component {
    state = {
        selected: 0,
        list: [
            { text: "精选热卖" },
            { text: "休闲食品" },
            { text: "牛奶饮料" },
            { text: "生鲜果蔬" },
            { text: "美妆护肤" },
            { text: "日用百货" },
            { text: "学习用品" },
            { text: "电子数码" },
        ]
    }
    render() {
        const { list, selected } = this.state
        return (
            <ScrollView>
                {list.map((it, i) => (
                    <TouchableNativeFeedbackEx key={i} onPress={()=>this.setState({selected:i})}>
                        <View style={[styles.menuItem,i==selected&&styles.menuItemActive]}>
                            <Text style={[styles.menuItemText,i==selected&&styles.menuItemTextActive]}>{it.text}</Text>
                        </View>
                    </TouchableNativeFeedbackEx>
                ))}
            </ScrollView>
        );
    }
}

export default class extends React.Component {
    static navigationOptions = {
        title: '分类',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                source={focused ? require('../../images/category_select_icon.png') : require('../../images/category_icon.png')} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBarBox}>
                    <SearchButton navigation={this.props.navigation} placeholder="酸奶" style={{ backgroundColor: "#F3F2F8" }} />
                </View>
                <View style={styles.listBox}>
                    <View style={styles.leftBox}>
                        <ListMenu />
                    </View>
                    <View style={styles.rightBox}>
                        <ScrollView>
                            <View>
                                <Text>todo...</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}