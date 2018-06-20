import { AsyncStorage } from 'react-native';

export async function getUserInfo() {
    var str = await AsyncStorage.getItem('user')
    if (str === null) return null
    var user = JSON.parse(str)
    return user
}

export async function setUserInfo(user) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
}

export async function clearUserInfo() {
    await AsyncStorage.removeItem('user');
}