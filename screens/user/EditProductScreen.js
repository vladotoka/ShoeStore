import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';

const EditProductScreen = (props) => {
  return (
    <View style={styles.screen}>
      <DefaultText style={styles.text}>екран РЕДАКЦИЯ НА ПРОДУКТ</DefaultText>
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

export default EditProductScreen;
