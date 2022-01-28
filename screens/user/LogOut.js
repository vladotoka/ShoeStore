import React, { useEffect } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

import * as authActions from '../../store/actions/auth';

const LogOut = () => {
  const uid = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <Text>UID: {uid}</Text>
      <Text>Отписване...</Text>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  );
};

export default LogOut;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
