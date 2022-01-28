import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import AuthScreen from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/auth';


const StartupScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // const readDataFromStorage = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('userData');
  
  //     console.log(`reading AsyncStorage UID: ${JSON.parse(jsonValue)}`);
  
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     // error reading value
  //     alert(
  //       `Неуспешно четене на данни от паметта на устойството! response error :${e} `
  //     );
  //   }
  // };
  

  useEffect(() => {
    const tryLogin = async () => {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem('userData');
      //if there is no data user is not logged so we need to navigate to the login screen
      // if (!userData) {
      //   setIsLoading(false);
      //   console.info('startupScreen: user data is null in asyncStorage-login needed');
      //   return;
      // }

      const transformedData = JSON.parse(userData); //transformedData: { token, userId, expiryDate }
      console.log(`SartupScreen: transormedData.userID: ${transformedData.userId}`);
      console.log(`SartupScreen: transormedData.token: ${transformedData.token}`);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      // check if the token is expired, missing or there is no uid
      if (expirationDate <= new Date() || !token || !userId) {
        setIsLoading(false);
        console.info('startupScreen: no token or user ID in asyncStorage-login needed');

        return;
      }
      setIsLoading(false);
      console.log('startup screen dispathing authOK');
      dispatch(authActions.authenticate(userId, token));

    };

    tryLogin();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return <AuthScreen />

};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

