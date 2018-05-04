import {Dimensions } from 'react-native';

var scaleRate
const designWidth=375


export function scale(n){
    if(!scaleRate){
        scaleRate=Dimensions.get('window').width/designWidth
    }
    return n*scaleRate
}