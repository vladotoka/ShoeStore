import React from 'react';
import { Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

const Stack = createStackNavigator();

function ShopStack() {
  return (
    <Stack.Navigator initialRouteName="ProductsOverview"
    screenOptions={{
      headerStyle: {
        backgroundColor:
          Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      headerTitleStyle: { fontFamily: 'sevilla', fontSize: 24 },
      headerBackTitleStyle: { fontFamily: 'sevilla' },
    }}>
      <Stack.Screen name="ProductsOverview" component={ProductsOverviewScreen} options={{title: "Всички Продукти"}}/>
      <Stack.Screen name="ProductDetails" component={ProductDetailScreen} options={{title: "Инфо за продукт"}}/>
      <Stack.Screen name="Cart" component={CartScreen} options={{title: "Количка"}}/>
    </Stack.Navigator>
  );
}

function ShopNavigator() {
  return (
    <NavigationContainer>
      <ShopStack />
    </NavigationContainer>
  );
}

export default ShopNavigator;
