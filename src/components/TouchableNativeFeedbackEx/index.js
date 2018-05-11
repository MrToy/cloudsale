import {Platform,TouchableWithoutFeedback,TouchableNativeFeedback } from 'react-native';
export default Platform.OS === 'ios'?TouchableWithoutFeedback:TouchableNativeFeedback