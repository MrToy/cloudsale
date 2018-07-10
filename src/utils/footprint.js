import { AsyncStorage } from 'react-native';

export async function getFootprintList(){
    var str=await AsyncStorage.getItem('footprint')
    if(str===null){
        return []
    }
    return JSON.parse(str)
}

export async function setFootprint(item){
    var list=await getFootprintList()
    if(list.findIndex(it=>it.id==item.id)>-1){
        return
    }
    item.FootprintTime=new Date()
    list.unshift(item)
    await AsyncStorage.setItem('footprint', JSON.stringify(list))
}