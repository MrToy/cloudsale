import { AsyncStorage } from 'react-native';


var user=null

export async function initUser(){
    var str = await AsyncStorage.getItem('user')
    if (str === null) {
        user=null
        return
    }
    var _user = JSON.parse(str)
    user=_user
}


export function getUserInfo() {
    return user
}

export async function setUserInfo(_user) {
    user=_user
    await AsyncStorage.setItem('user', JSON.stringify(_user));
}

export async function clearUserInfo() {
    user=null
    await AsyncStorage.removeItem('user');
}