import Toast from 'react-native-root-toast';
import UserStore from './user';

export default async function addCart(id,count,specifications_id){
    var user=UserStore.user
    if(!user){
        this.props.navigation.navigate('UserLogin')
        return
    }
    var res = await fetch("https://www.bjzntq.com:8888/Commodity/addCart/", {
        method: "POST",
        body: JSON.stringify({
            tokeninfo:user.tokeninfo,
            commodity_id:id,
            count:count||1,
            specifications_id:specifications_id||undefined
        })
    }).then(res => res.json())
    Toast.show(res.message,{
        position:Toast.positions.CENTER
    })
}