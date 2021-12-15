import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';


const CartScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });

  console.log(cartItems);

  return (
    <View style={styles.screen}>
      <DefaultText style={styles.text}>екран КОЛИЧКА</DefaultText>
      <View style={styles.summary}>
        <DefaultText style={styles.summaryText}>
          Oбща сума:{' '}
          <DefaultText style={styles.amount}>
            {cartTotalAmount.toFixed(2)}лв
          </DefaultText>
        </DefaultText>
        <Button
          title="Плащане"
          color={Colors.accentColor}
          disabled={cartItems.length === 0}
          onPress={() => {
            console.log('плащане'); //addOrder = (cartItems, totalAmount)
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  text: {
    color: Colors.primaryColor,
    fontSize: 35,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'ubuntuBold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primaryColor,
  },
});

export default CartScreen;
