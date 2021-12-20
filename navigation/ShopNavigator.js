import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';

const ShopStack = createStackNavigator();
const AdminStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ShopStackScreen() {
  return (
    <ShopStack.Navigator
      initialRouteName="ProductsOverview"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
        },
        headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        headerTitleStyle: { fontFamily: 'ubuntuBold', fontSize: 18 },
        headerBackTitleStyle: { fontFamily: 'ubuntu' },
      }}
    >
      <ShopStack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{ title: 'Всички Продукти' }}
      />
      <ShopStack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.productName })}
      />
      <ShopStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Количка' }}
      />
    </ShopStack.Navigator>
  );
}
function AdminStackScreen() {
  return (
    <AdminStack.Navigator
      initialRouteName="UserProductsOverview"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
        },
        headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        headerTitleStyle: { fontFamily: 'ubuntuBold', fontSize: 18 },
        headerBackTitleStyle: { fontFamily: 'ubuntu' },
      }}
    >
      <AdminStack.Screen
        name="UserProductsOverview"
        component={UserProductsScreen}
        options={{ title: 'Твоите Продукти' }}
      />
      {/* <AdminStack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.productName })}
      />
      <AdminStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Количка' }}
      /> */}
    </AdminStack.Navigator>
  );
}

//Drawer Navigation
function MainShopNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        // headerShown: false,
        drawerActiveTintColor: Colors.primaryColor,
        drawerLableStyle: { fontFamily: 'ubuntuBold' },
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
        },
        headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        headerTitleStyle: { fontFamily: 'ubuntuBold', fontSize: 18 },
      }}
    >
      <Drawer.Screen
        name="main"
        component={ShopStackScreen}
        options={{
          drawerLabel: 'Магазин',
          headerShown: false,
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={drawerConfig.size}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="orders"
        component={OrdersScreen}
        options={{
          drawerLabel: 'Твоите Поръчки',
          title: 'Твоите Поръчки',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={drawerConfig.size}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="myProducts"
        component={AdminStackScreen}
        options={{
          drawerLabel: 'Твоите Продукти',
          headerShown: false,
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'leaf' : 'leaf'}
              size={drawerConfig.size}
              color={drawerConfig.color}
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}
function ShopNavigator() {
  return (
    <NavigationContainer>
      <MainShopNavigator />
    </NavigationContainer>
  );
}

export default ShopNavigator;
