import React from 'react';
import { Text, View } from 'react-native';
import SearchButton from '../Main/SearchButton';
import { scale } from '../../utils/dimension';
import CommodityList from '../../components/CommodityList'

export default class extends React.Component {
    static navigationOptions = {
        title: '搜索',
        headerRight:<View />,
    }
    state={
        keyword:"",
        list:[]
    }
    componentDidMount(){
        const keyword = this.props.navigation.getParam('keyword')
        const categoryId=this.props.navigation.getParam('categoryId')
        this.setState({keyword})
        this.fetchList(keyword)
    }
    async fetchList(keyword){
        var res = await fetch("https://www.bjzntq.com:8888/Commodity/GetCommodityByCategory/", {
            method: "POST",
            body: JSON.stringify({
                keyword
            })
        }).then(res => res.json())
        this.setState({list:res.data||[]})
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1' }}>
                <View style={{height:scale(34), alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingLeft: scale(11), paddingRight: scale(11)}}>
                    <SearchButton navigation={this.props.navigation} placeholder={this.state.keyword} style={{ backgroundColor: "#F3F2F8" }} />
                </View>
                <CommodityList list={this.state.list.map(it=>({
                    id: it.commodity_id,
                    imageUrl:it.commodity_image,
                    name: it.commodity_name,
                    price: it.deduct_price
                }))} />
            </View>
        )
    }
}