import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/CustomHeaderButton';

const ProductsOverviewScreen = (props) => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={'ios-cart-outline'}
            onPress={() => {
              //   alert('this is cart');
              props.navigation.navigate('Cart', { sendSomething: 42 });
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation]);

  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback
        onPress={() => {
            props.navigation.navigate('ProductDetails', { sendSomething: 42 });
        }}
      >
        <View>
          <DefaultText style={styles.text}>
            Основен екран на магазина
          </DefaultText>
        </View>
      </TouchableWithoutFeedback>
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

export default ProductsOverviewScreen;
