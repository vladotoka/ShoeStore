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


  //if there is no data user is not logged so we need to navigate to the login screen
  useEffect(() => {
    const tryLogin = async () => {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem('userData');

      const transformedData = JSON.parse(userData); //transformedData: { token, userId, expiryDate }
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      // check if the token is expired, missing or there is no uid
      if (expirationDate <= new Date() || !token || !userId) {
        setIsLoading(false);

        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      setIsLoading(false);
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  //during asyncStorage reading: show the spinner
  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  //if user is not authenticated: show the login screen
  return <AuthScreen />;
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
