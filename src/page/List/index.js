import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View,AsyncStorage } from 'react-native';
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
        width: scale(71), flex: 1, backgroundColor: "#fff", paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3
    },
    menuItem: {
        borderBottomColor: "#E9E8ED", borderBottomWidth: 1, height: scale(40), alignItems: "center", justifyContent: "center"
    },
    menuItemActive: {
        backgroundColor: "#fff"
    },
    menuItemText: {
        color: "#6A617A", fontSize: scale(11)
    },
    menuItemTextActive: {
        color: "#781EFD"
    },
})



class ListMenu extends React.Component {
    static propTypes = {
        list: PropTypes.array,
        onChange:PropTypes.func,
        index:PropTypes.number
    }
    render() {
        const { list,onChange,index } = this.props
        return (
            <ScrollView>
                {list.map((it, i) => (
                    <TouchableWithoutFeedback key={i} onPress={() => onChange(i)}>
                        <View style={[styles.menuItem, i == index && styles.menuItemActive]}>
                            <Text style={[styles.menuItemText, i == index && styles.menuItemTextActive]}>{it.text}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        );
    }
}

class CateList extends React.Component {
    render(){
        var {categoryThumb,categoryDetail}=this.props.data
        return (
            <View>
                <Image source={{uri:categoryThumb}} style={{width:"100%",height:scale(84),marginBottom:scale(14)}} />
                {categoryDetail.map(it=>(
                    <View key={it.categoryId}>
                        <Text style={{color:"#6A617A",fontSize:scale(11),lineHeight:scale(16),marginBottom:scale(4)}}>{it.subCategoryName}</Text>
                        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between"}}>
                            {it.subCategoryItem.map(itit=>(
                                <TouchableWithoutFeedback key={itit.categoryId} onPress={()=>this.props.onItemPress(it.categoryId,itit.categoryId)}>
                                    <View  style={{marginBottom:scale(7)}}>
                                        <Image source={{uri:itit.categoryThumb}} style={{width:scale(92),height:scale(92),resizeMode:"contain",backgroundColor:"#F8F8F8"}} />
                                        <Text style={{textAlign:"center",marginTop:scale(4),fontSize: scale(11),color: "#6A617A"}}>{itit.categoryName}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        )
    }
}

export default class extends React.Component {
    state = {
        list: [],
        cateIndex:0
    }
    static navigationOptions = {
        title: '分类',
        tabBarIcon: ({ focused }) => (
            <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                source={focused ? require('../../images/category_select_icon.png') : require('../../images/category_icon.png')} />
        )
    }
    constructor(props){
        super(props)
        this.onVisibleChange=this.onVisibleChange.bind(this)
    }
    async fetchList() {
        var data
        try{
            data=JSON.parse(await AsyncStorage.getItem('list.data'))
        }catch(err){
            //
        }
        if(!data){
            var res = await fetch("https://www.bjzntq.com:8888//Commodity/getCategoryList/", { method: "POST" }).then(res => res.json())
            if (res.result != 200) {
                return
            }
            data=res.data
        }
        this.setState({
            list:data
        })
        await AsyncStorage.setItem('list.data', JSON.stringify(data))
    }
    onIndex(i){
        this._CateList.scrollToIndex({index:i,viewOffset:-1,animated:false})
        this.setState({cateIndex:i})
    }
    onVisibleChange(info){
        if(info.viewableItems.length){
            this.setState({cateIndex:info.viewableItems[0].index})
        }
    }
    componentDidMount() {
        this.fetchList()
    }
    render() {
        var menuList = this.state.list.map(it => ({
            text: it.categoryName
        }))
        return (
            <View style={styles.container}>
                <View style={styles.searchBarBox}>
                    <SearchButton onPress={()=>this.props.navigation.navigate('Search')} placeholder="酸奶" style={{ backgroundColor: "#F3F2F8" }} />
                </View>
                <View style={styles.listBox}>
                    <View style={styles.leftBox}>
                        <ListMenu list={menuList} index={this.state.cateIndex} onChange={i=>this.onIndex(i)} />
                    </View>
                    <View style={styles.rightBox}>
                        <FlatList
                            ref={c=> this._CateList = c}
                            data={this.state.list}
                            onViewableItemsChanged={this.onVisibleChange}
                            renderItem={({item}) => <CateList data={item} key={item.categoryId} onItemPress={(id,subid)=>this.props.navigation.navigate('SearchResult',{categoryId:id,subcategoryId:subid})} />} />
                    </View>
                </View>
            </View>
        );
    }
}