import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/CustomHeaderButton';

const ProductDetailScreen = (props) => {
  const {id, sendSomething} = props.route.params;

  return (
    <View style={styles.screen}>
      <DefaultText style={styles.text}>екран ПОДРОБНОСТИ ЗА ПРОДУКТА</DefaultText>
      <DefaultText>status:{sendSomething}</DefaultText>
      <DefaultText>id:{id}</DefaultText>
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

export default ProductDetailScreen;
