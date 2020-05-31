import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScanQRCodeScreen = ({ navigation }) => {

    const onScanned = e => {
        navigation.state.params.onQRScanned(e.data);
        navigation.goBack();
    };
    function get(){

    }
    return <QRCodeScanner
        onRead={onScanned}
        flashMode={RNCamera.Constants.FlashMode.off}
        bottomContent={
            <TouchableOpacity style={styles.buttonTouchable} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
        }
    />
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 12,
        margin: 12
    }
});
export default ScanQRCodeScreen;
export function get(){
    return "My name is khan";
}