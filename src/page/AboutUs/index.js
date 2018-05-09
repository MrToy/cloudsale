import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { scale } from '../../utils/dimension';


const InfoText = `        智诺致力于成为一家为社会创造最大价值的公司。经过3年砥砺前行，智诺在商业领域一次又一次突破创新，取得了跨越式发展。与此同时，智诺不忘初心，积极履行企业社会责任，在促进就业、提升社会效率、反哺实体经济等方面不断为社会做出贡献。
        
        截至目前，智诺通过品牌打造、自营直采、地方特产、众筹扶贫等模式，依托强大的物流基础设施网络和供应链整合能力，大幅提升了行业运营效率，降低了社会成本。在品质电商的理念下，智诺优化电商模式，精耕细作反哺实体经济，进一步助力供给侧改革。智诺以社会和环境为抓手整合内外资源，与政府、媒体和公益组织协同创新，为用户、为合作伙伴、为员工、为环境、为社会创造共享价值。
        
        智诺坚持诚信经营，大量品牌直供从源头杜绝假货，对假冒伪劣商品“零容忍”，通过严审商家资质、严控进货渠道确保正品行货。智诺奉行客户为先、诚信、团队、创新、激情的价值观，期望成为全球最值得信赖的企业。
`


export default class extends React.Component {
    static navigationOptions = {
        title: '关于我们',
        headerRight: () => { },
    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff', height: "100%"}}>
                <ScrollView style={{paddingLeft: scale(13), paddingRight: scale(13) }}>
                    <View style={{ marginTop: scale(25), alignItems: "center" }}>
                        <Text style={{ fontSize: scale(15) }}>企业简介</Text>
                    </View>
                    <View style={{ marginTop: scale(25) }}>
                        <Text style={{ fontSize: scale(12), lineHeight: scale(25) }}>{InfoText}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}