import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen';
import ShopNavigator from './navigation/ShopNavigator';



const fetchFonts = async () => {
  await Font.loadAsync({
    sevilla: require('./assets/fonts/SevillaDecor.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.warn('font lodinng error')}
      />
    );
  }

  return (
    <ShopNavigator/>
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
