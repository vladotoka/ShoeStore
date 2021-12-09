import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/CustomHeaderButton';

const CartScreen = (props) => {
  const cart = useSelector(state => state.cart);
  console.log(cart);
  
  return (
    <View style={styles.screen}>
      <DefaultText style={styles.text}>екран КОЛИЧКА</DefaultText>
      <DefaultText>сума{cart.totalAmount}лв</DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.primaryColor,
    fontSize: 35,
  },
});

export default CartScreen;
