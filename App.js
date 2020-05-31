/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from "react-navigation"


//screens
import ProductForm from './src/ProductForm'
import Demo from './src/screen/Demo'
import QRCodeScreen from './src/screen/QRCodeScreen'
import ScanQRCodeScreen from './src/screen/ScanQRCodeScreen'
import CheckoutPage from './src/screen/CheckoutPage'
import PaymentHistoryPage from './src/screen/PaymentHistoryPage'
import { View } from 'react-native';


const navigator = createStackNavigator({
  ProductForm: {
    screen: ProductForm,
    navigationOptions: { title: 'Product Details' }
  },
  Demo: {
    screen: Demo,
    navigationOptions: { title: 'Demo Page' }
  },
  QRCodeScreen: {
    screen: QRCodeScreen,
    navigationOptions: { title: 'QR Code' }
  },
  ScanQRCodeScreen: {
    screen: ScanQRCodeScreen,
    navigationOptions: { title: 'Scan QR Code' }
  },
  CheckoutPage: {
    screen: CheckoutPage,
    navigationOptions: { title: 'Checkout' }
  },
  PaymentHistoryPage: {
    screen: PaymentHistoryPage,
    navigationOptions: { title: 'Payments' }
  }
},
  {
    initialRouteName: 'ProductForm',
    defaultNavigationOptions: {
      title: 'Home',
      headerBackTitle: 'Back',
      headerStyle:{
        backgroundColor:'#f8dcd2'
      }
    }
  });

export default createAppContainer(navigator);