import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/CustomHeaderButton';

const ProductDetailScreen = (props) => {
  const { productId, sendSomething } = props.route.params; //nav v6 destruct
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  console.log(selectedProduct);
  return (
    <View style={styles.screen}>
      <ScrollView>
        <DefaultText style={styles.text}>
          екран ПОДРОБНОСТИ ЗА ПРОДУКТА
        </DefaultText>
        <DefaultText style={styles.temp}>status:{sendSomething}</DefaultText>
        <DefaultText style={styles.temp}>id:{productId}</DefaultText>
        <DefaultText style={styles.temp}>{selectedProduct.description}</DefaultText>
      </ScrollView>
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
  temp: {
    fontSize: 27,
  },
});

export default ProductDetailScreen;
