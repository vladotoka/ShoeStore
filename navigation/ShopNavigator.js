import React, { useEffect, useState } from 'react';
import { Platform, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import LogOut from '../screens/user/LogOut';
import StartupScreen from '../screens/StartupScreen';

import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

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
        options={{ title: 'Администратор' }}
      />
      {/* <AdminStack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.productName })}
      /> */}
      <AdminStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({ route }) => ({ title: route.params.headerTitle })}
      />
    </AdminStack.Navigator>
  );
}

//Drawer Navigation
function MainShopNavigator() {
  const uid = useSelector((state) => state.auth.userId);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (uid) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [uid]);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
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
      {!isLogged ? (
        <>
          <Drawer.Screen
            name="auth"
            component={StartupScreen}
            options={{
              drawerLabel: 'Вписване',
              title: 'Вписване',
              headerShown: true,
              drawerIcon: (drawerConfig) => (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                  size={drawerConfig.size}
                  color={drawerConfig.color}
                />
              ),
            }}
          />
        </>
      ) : (
        <>
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
              drawerLabel: 'Администратор',
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
          <Drawer.Screen
            name="logout"
            component={LogOut}
            options={{
              drawerLabel: 'Отписване',
              title: 'Отписване',
              drawerIcon: (drawerConfig) => (
                <Ionicons
                  name="log-out"
                  size={drawerConfig.size}
                  color={drawerConfig.color}
                />
              ),
            }}
          />
        </>
      )}
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

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button
        title="Отписване"
        onPress={() => {
          dispatch(authActions.logout());
          props.navigation.dispatch(DrawerActions.closeDrawer());
        }}
      />
    </DrawerContentScrollView>
  );
}

export default ShopNavigator;
