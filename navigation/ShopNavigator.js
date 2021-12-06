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
    <Stack.Navigator initialRouteName="Shop"
    screenOptions={{
      headerStyle: {
        backgroundColor:
          Platform.OS === 'android' ? Colors.primaryColor : 'white',
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      headerTitleStyle: { fontFamily: 'sevilla', fontSize: 24 },
      headerBackTitleStyle: { fontFamily: 'sevilla' },
    }}>
      <Stack.Screen name="Shop" component={ProductsOverviewScreen} options={{title: "Магазин"}}/>
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
