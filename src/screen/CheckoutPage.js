import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const CheckoutPage = ({ navigation }) => {

    var isDestroyed = false;

    useEffect(() => {
        setTimeout(() => {
            if (!isDestroyed) {
                proceed();
            }
        }, 2000);
        return () => {
            isDestroyed = true;
        }
    }, []);

    const proceed = () => {
        navigation.state.params.onCheckout();
        navigation.goBack();
    };
    return <View style={styles.container}>
        <ActivityIndicator color="#5821e4" size="large" />
        <Text style={styles.message}>Please wait, We are processing your request</Text>
    </View>
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    message: {
        fontSize: 14,
        color: "#000000",
        margin: 16,
        textAlign: "center"
    }
});
export default CheckoutPage;