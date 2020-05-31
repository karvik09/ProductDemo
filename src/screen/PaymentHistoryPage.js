import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { getProductSchema, RealmConfig, getProductSchemaName } from '../db/ProductSchema';
import { FlatList } from 'react-native-gesture-handler';
import { Results } from 'realm';
import PaymentHistoryItem from '../components/PaymentHistoryItem';


const PaymentHistoryPage = () => {

    const [loading, setLoading] = useState(true);
    const [showEmptyView, setShowEmptyView] = useState(false);
    const [results, setResults] = useState([]);

    const Realm = require('realm');

    const loader = () => {
        return loading ? <View style={styles.progressContainer}>
            <ActivityIndicator color="#5821e4" size="large" />
        </View> : null
    }
    const emptyView = () => {
        return showEmptyView ? <View style={styles.progressContainer}>
            <Text style={styles.emptyView}>No Payment done yet!</Text>
        </View> : null
    };
    const transactionList = () => {
        return results.length > 0 ?
            <FlatList
                data={results}
                renderItem={({ item }) => <PaymentHistoryItem item={item} />}
                keyExtractor={item => item.id}
                scrollIndicatorInsets={{ right: 1 }}
            />
            : null
    }

    useEffect(() => {
        Realm.open(RealmConfig)
            .then(realm => {
                let items = realm.objects(getProductSchemaName()).sorted("id", true)
                // realm.close();
                setLoading(false);
                setShowEmptyView(items.length === 0);
                setResults(items);
            });
    }, []);

    return <View style={styles.container}>
        {loader()}
        {emptyView()}
        {transactionList()}
    </View>
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    progressContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    emptyView: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center"
    }
});
export default PaymentHistoryPage;