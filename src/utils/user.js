import { observable,action } from "mobx";
import { AsyncStorage } from 'react-native';

// var user=null

// export async function initUser(){
//     var str = await AsyncStorage.getItem('user')
//     if (str === null) {
//         user=null
//         return
//     }
//     var _user = JSON.parse(str)
//     user=_user
// }


// export function getUserInfo() {
//     return user
// }

// export async function setUserInfo(_user) {
//     user=_user
//     await AsyncStorage.setItem('user', JSON.stringify(_user));
// }

// export async function clearUserInfo() {
//     user=null
//     await AsyncStorage.removeItem('user');
// }


class UserStore {
    @observable user = null
    constructor() {
        this.initUser()
    }
    @action
    async initUser() {
        var str = await AsyncStorage.getItem('user')
        if (str === null) {
            user = null
            return
        }
        var _user = JSON.parse(str)
        this.user = _user
    }
    @action
    async setUserInfo(_user) {
        this.user = _user
        await AsyncStorage.setItem('user', JSON.stringify(_user))
    }
    @action
    async clearUserInfo() {
        this.user = null
        await AsyncStorage.removeItem('user')
    }
}
export default new UserStore()