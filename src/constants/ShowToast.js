import { Alert, ToastAndroid } from 'react-native'

export function SHOW_TOAST(message) {
    if (Platform.OS == 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    }
    else {
        Alert.alert('', message)
    }
}

export function SHOW_SUCCESS_TOAST(message) {
    if (Platform.OS == 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    }
    else {
        Alert.alert('', message)
    }
}