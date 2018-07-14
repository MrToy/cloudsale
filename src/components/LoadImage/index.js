import FastImage from 'react-native-fast-image';
import React from 'react';


function isExist(source) {
    if (!source) {
        return false
    }
    if (typeof (source) == 'number') {
        return true
    }
    if (!source.uri) {
        return false
    }
    return true
}

export default class LoadImage extends React.Component {
    state = {
        isError:false
    }
    render() {
        const props = this.props
        var isEnd=isExist(props.source)&&!this.state.isError
        return (
            <FastImage
                {...props}
                resizeMode={isEnd?props.resizeMode:'contain'}
                style={isEnd?props.style:{...props.style,backgroundColor:'#fff'}}
                onError={()=>this.setState({isError:true})}
                loadingIndicatorSource={require('../../images/placeholder.png')}
                source={isEnd ? props.source : require('../../images/placeholder.png')} />
        )
    }
}