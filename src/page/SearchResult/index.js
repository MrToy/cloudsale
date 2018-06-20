import React from 'react';
import { ScrollView, View } from 'react-native';
import CommodityList from '../../components/CommodityList';
import { scale } from '../../utils/dimension';
import SearchButton from '../Main/SearchButton';

export default class extends React.Component {
    static navigationOptions = {
        title: '搜索',
        headerRight: <View />,
    }
    state = {
        keyword: "",
        categoryId: null,
        subcategoryId: null,
        list: []
    }
    componentDidMount() {
        const keyword = this.props.navigation.getParam('keyword')
        const categoryId = this.props.navigation.getParam('categoryId')
        const subcategoryId = this.props.navigation.getParam('subcategoryId')
        this.setState({
            keyword,
            categoryId,
            subcategoryId
        }, () => {
            this.fetchList()
        })
    }
    async fetchList() {
        var res = await fetch("https://www.bjzntq.com:8888/Commodity/GetCommodityByCategory/", {
            method: "POST",
            body: JSON.stringify({
                keyword: this.state.keyword || null,
                categoryId: this.state.categoryId || null,
                subcategoryId: this.state.subcategoryId || null
            })
        }).then(res => res.json())
        this.setState({ list: res.data || [] })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f1f1f1' }}>
                <View style={{ height: scale(34), alignItems: "center", justifyContent: "center", backgroundColor: "#fff", paddingLeft: scale(11), paddingRight: scale(11),marginBottom:scale(2) }}>
                    <SearchButton onPress={() => this.props.navigation.navigate('Search')} placeholder={this.state.keyword} style={{ backgroundColor: "#F3F2F8" }} />
                </View>
                <ScrollView>
                    <CommodityList list={this.state.list.map(it => ({
                        id: it.commodity_id,
                        imageUrl: it.commodity_image,
                        name: it.commodity_name,
                        price: it.deduct_price
                    }))} />
                </ScrollView>
            </View>
        )
    }
}