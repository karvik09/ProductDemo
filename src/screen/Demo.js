import  React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const Demo = ({navigation}) => {

    const product=navigation.getParam('product');
    // const price=navigation.getParam('price');
    // const description=navigation.getParam('description');

    console.log(product);
    // console.log('name: '+name+' price: '+price+' Description: '+description);
    
    return <View style={styles.container}>
        <ActivityIndicator ></ActivityIndicator>
    </View>
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    }
});
export default Demo;