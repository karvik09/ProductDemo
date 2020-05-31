import { Platform, Alert, ToastAndroid } from "react-native";

export function showToast(message) {
    if (Platform.OS === 'ios') {
        Alert.alert('Alert', message,
            [
                {
                    text: 'OK',
                    onPress: () => { }
                }
            ],
            { cancelable: true }
        )
    } else {
        ToastAndroid.show(message, ToastAndroid.LONG)
    }
}