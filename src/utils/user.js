import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';

export async function getUserInfo(){
    try {
        var user=JSON.parse(await AsyncStorage.getItem('user'))
    } catch (err) {
        Toast.show("未登录",{
            position:Toast.positions.CENTER
        })
        throw err
    }
    return user
}

export async function setUserInfo(user){
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        Toast.show("保存登录信息失败",{
            position:Toast.positions.CENTER
        })
    }
}

export async function clearUserInfo(){
    try {
        await AsyncStorage.removeItem('user');
    } catch (err) {
        Toast.show("清除登录信息失败",{
            position:Toast.positions.CENTER
        })
    }
}