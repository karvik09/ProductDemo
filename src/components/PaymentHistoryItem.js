import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';

const PaymentHistoryItem = ({ item }) => {

    const descriptionView = () => {
        let description = item.description
        return (description != null || description.trim().length > 0) ?
            <View style={styles.subContainer}>
                <Text style={styles.label}>Description: </Text>
                <Text style={styles.value}>{description}</Text>
            </View>
            : null
    }
    const txnTime = () => {
        let dt = item.time.toString();
        return moment(dt).format('DD-MM-YY');
    }
    moment.locale('en');
    return <View style={styles.container}>
        <View style={styles.subContainer}>
            <Text style={styles.label}>Product Name: </Text>
            <Text style={styles.value}>{item.name}</Text>
        </View>
        <View style={styles.subContainer}>
            <Text style={styles.label}>Txn Amount: </Text>
            <Text style={styles.value}>{item.price}/-</Text>
        </View>
        {descriptionView()}
        <View style={styles.subContainer}>
            <Text style={styles.label}>Date: </Text>
            <Text style={styles.value}>{txnTime()}</Text>
        </View>

    </View>
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        borderColor: "#000000",
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 4
    },
    subContainer: {
        flexDirection: "row",
        marginTop: 4
    },
    label: {
        fontWeight: 14,
        fontWeight: "bold"
    },
    value: {
        fontSize: 14,
        fontWeight: "normal",
        flex:1
    }
});
export default PaymentHistoryItem;