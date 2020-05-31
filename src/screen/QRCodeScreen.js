import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Platform, PermissionsAndroid } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import { showToast } from '../components/Toast';


const QRCodeScreen = ({ navigation }) => {

    var svg;
    const proceedToCheckout = () => {
        navigation.state.params.qrCreated();
        navigation.goBack();
    };

    const shareQRCode = () => {
        let imagePath = RNFS.CachesDirectoryPath + "/QRCode.png";
        svg.toDataURL((data) => {
            RNFS.writeFile(imagePath, data, 'base64')
                .then(success => {
                    return CameraRoll.save(imagePath, 'photo')
                })
                .then(() => {
                    console.log('Saved file to gallery');
                    shareImage(imagePath);
                })
                .catch(err => {
                    console.log(err);
                });
        })
    };
    const checkPermission = () => {
        if (Platform.OS === 'ios') {
            shareQRCode();
        } else {
            requestStoragePermissionToShareQR();
        }
    }
    const requestStoragePermissionToShareQR = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Permission",
                    message:
                        "Permission required to share QR code",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                shareQRCode();
            } else {
                showToast('Permission Denied!');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const shareImage = (imagePath) => {
        let absPath = Platform.OS === 'android' ? `file://${imagePath}` : imagePath
        Share.open({ url: absPath })
            .then(res => {
                console.log("Share Then");
            })
            .catch(err => {

                console.log("Error in Sharing photo..");
            });
    };
    const product = navigation.getParam('product');

    return <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
            <QRCode
                value={product}
                size={200}
                getRef={(ref) => (svg = ref)}>
            </QRCode>
        </View>

        <TouchableHighlight underlayColor="white"
            onPress={checkPermission}
            style={styles.checkoutTouchable}>
            <View style={styles.checkoutView}>
                <Text style={styles.checkoutBtn}>Share QR Code</Text>
            </View>

        </TouchableHighlight>

        {/* <TouchableHighlight underlayColor="white"
            onPress={proceedToCheckout}
            style={styles.checkoutTouchable}>
            <View style={styles.checkoutView}>
                <Text style={styles.checkoutBtn}>Proceed to checkout</Text>
            </View>

        </TouchableHighlight> */}


    </View>;
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fcf0e8",
        justifyContent: "center"
    },
    checkoutView: {
        backgroundColor: "#5821e4",
        borderRadius: 4,
        color: "#ffffff",
        justifyContent: "center"
    },
    checkoutBtn: {
        textAlign: "center",
        fontSize: 14,
        color: "#ffffff",
        padding: 16,
        fontWeight: "bold"
    },
    checkoutTouchable: {
        marginHorizontal: 16,
        marginTop: 40
    }
});
export default QRCodeScreen;