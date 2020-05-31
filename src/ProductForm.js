import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableHighlight, Alert, Platform, ToastAndroid } from "react-native";
import { RealmConfig, getProductSchema, getProductSchemaName } from './db/ProductSchema';
import { showToast } from './components/Toast';

const ProductForm = ({ navigation }) => {

    const [pName, setPName] = useState('');
    const [pPrice, setPPrice] = useState('');
    const [pDescription, setPDescription] = useState('');
    const Realm = require('realm');


    const getProduct = () => {
        const product = {
            productName: pName,
            productPrice: pPrice,
            productDescription: pDescription
        };
        return JSON.stringify(product);
    }
    const onQRScanned = (data) => {
        console.log(`Scanned Data: ${data}`);
        try {
            let product = JSON.parse(data);
            console.log(`price: ${product.pPrice} & Des: ${product.pDescription}`);
            setPName(product.productName);
            setPPrice(product.productPrice);
            setPDescription(product.productDescription);
        } catch (err) {
            showParsingError();
        }
    };
    const showParsingError = () => {
        showAlert('Error', 'Invalid Product Please choose right one!');
    };

    const showAlert = (title, message) => {
        Alert.alert(title, message,
            [
                {
                    text: 'OK',
                    onPress: () => { }
                }
            ],
            { cancelable: true }
        )
    };

    const validateProduct = () => {

        if (pName.trim().length === 0) {
            showAlert('Alert', 'Please enter valid product Name!');
            return false;
        } else if (pPrice.trim().length === 0) {
            showAlert('Alert', 'Please enter valid product price!');
            return false;
        }
        return true;
    };

    //Navigation
    const navigateToQRCodeScreen = () => {
        if (validateProduct()) {
            navigation.navigate('QRCodeScreen',
                {
                    product: getProduct()
                })
        }
    }
    const navigateToScanCodeScreen = () => {
        navigation.navigate('ScanQRCodeScreen',
            {
                onQRScanned: onQRScanned
            })
    }

    const navigateToCheckout = () => {
        if (validateProduct()) {
            navigation.navigate('CheckoutPage', {
                onCheckout: onCheckout
            })
        }
    };
    const clearFields = () => {
        setPName('');
        setPPrice('');
        setPDescription('');
    };

    const onCheckout = () => {
        showToast('Payment Successful.');
        clearFields();
        Realm.open(RealmConfig)
            .then(realm => {
                realm.write(() => {
                    let _id = realm.objects(getProductSchemaName()).max('id');
                    realm.create(getProductSchemaName(), {
                        id: _id == null ? 1 : _id + 1,
                        name: pName,
                        price: pPrice,
                        description: pDescription,
                        time: new Date()
                    });
                });
                let items = realm.objects(getProductSchemaName());
                console.log(`items are: ${JSON.stringify(items)}`);
                realm.close();
            });

    }

    return <ScrollView style={styles.container}>
        <Text style={styles.productLabel}>Please fill the product details</Text>

        <TextInput style={styles.textField}
            placeholder="Product Name"
            placeholderTextColor="#7d7d7d"
            autoCorrect={false}
            maxLength={30}
            value={pName}
            onChangeText={text => setPName(text)}>
        </TextInput>

        <TextInput style={styles.textField}
            placeholder="Product Price"
            placeholderTextColor="#7d7d7d"
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={10}
            value={pPrice}
            onChangeText={text => setPPrice(text)}>
        </TextInput>

        <TextInput style={styles.textField}
            placeholder="Product Description"
            placeholderTextColor="#7d7d7d"
            autoCorrect={false}
            multiline={true}
            value={pDescription}
            onChangeText={text => setPDescription(text)}>

        </TextInput>


        <TouchableHighlight underlayColor="white"
            onPress={navigateToQRCodeScreen}
            style={styles.checkoutTouchable}>
            <View style={styles.checkoutView}>
                <Text style={styles.checkoutBtn}>Create QR Code</Text>
            </View>

        </TouchableHighlight>

        <TouchableHighlight underlayColor="white"
            onPress={navigateToScanCodeScreen}
            style={styles.checkoutTouchable}>
            <View style={styles.checkoutView}>
                <Text style={styles.checkoutBtn}>Scan QR Code</Text>
            </View>

        </TouchableHighlight>
        <TouchableHighlight underlayColor="white"
            onPress={navigateToCheckout}
            style={styles.checkoutTouchable}>
            <View style={styles.checkoutView}>
                <Text style={styles.checkoutBtn}>Proceed to checkout</Text>
            </View>

        </TouchableHighlight>
        <TouchableHighlight underlayColor="white"
            onPress={() => navigation.navigate('PaymentHistoryPage')}
            style={styles.checkoutTouchable}>
            <View style={styles.checkoutView}>
                <Text style={styles.checkoutBtn}>Payment History</Text>
            </View>

        </TouchableHighlight>
    </ScrollView>

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fcf0e8"
    },
    productLabel: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 16,
        marginTop: 20,
        marginBottom: 40
    },
    textField: {
        fontSize: 14,
        color: "#000000",
        fontWeight: "bold",
        borderColor: "#5821e4",
        backgroundColor: "#e8e8e8",
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 4,
        paddingVertical: 12,
        marginHorizontal: 16,
        marginVertical: 18,
        maxHeight: 100,
        minHeight: 50
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
        marginVertical: 20
    }
});
export default ProductForm;