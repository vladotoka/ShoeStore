import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';

import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen';
import ShopNavigator from './navigation/ShopNavigator';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const store = createStore(rootReducer);

export default function App() {

  let [fontsLoaded] =useFonts({
    'ubuntu': require('./assets/fonts/Ubuntu-R.ttf'),
    'ubuntuBold': require('./assets/fonts/Ubuntu-B.ttf')
  });

  if (!fontsLoaded) {return <AppLoading />;}

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
