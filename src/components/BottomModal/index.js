import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Easing, Modal, TouchableWithoutFeedback, View, Dimensions ,StatusBar} from 'react-native';
import { scale } from '../../utils/dimension';

export default class PayModal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func
    }
    constructor(props) {
        super(props)
        var statusHeight=StatusBar.currentHeight||0
        this._windowHeight = Dimensions.get('window').height-statusHeight
        this.state = {
            top: new Animated.Value(this._windowHeight),
            boxHeight: 0,
            visible: false
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.visible == prevProps.visible) {
            return
        }
        if (this.props.visible) {
            this.setState({visible:true})
            if(this._boxHeight){
                Animated.timing(this.state.top, {
                    toValue: this._windowHeight - this._boxHeight,
                    duration: 200,
                    easing: Easing.easing
                }).start()
            }
        } else {
            Animated.timing(this.state.top, {
                toValue: this._windowHeight,
                duration: 200,
                easing: Easing.easing
            }).start(() => {
                this.setState({visible:false})
            })
        }
    }
    onLayout(e) {
        var height = e.nativeEvent.layout.height
        if (this.state.visible&&this._boxHeight!=height) {
            Animated.timing(this.state.top, {
                toValue: this._windowHeight - height,
                duration: 200,
                easing: Easing.easing
            }).start()
        }
        this._boxHeight=height
    }
    render() {
        const { children, onClose } = this.props
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.visible}
                onRequestClose={onClose}
            >
                <View style={{ backgroundColor: "rgba(0,0,0,0.25)", height: "100%" }}>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={{ position: 'absolute', top: 0, left: 0, width: "100%", height: "100%", zIndex: 2 }}></View>
                    </TouchableWithoutFeedback>
                    <Animated.View onLayout={this.onLayout.bind(this)} style={{ backgroundColor: "#fff", width: "100%", position: "absolute", top: this.state.top,zIndex:3 }}>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}
