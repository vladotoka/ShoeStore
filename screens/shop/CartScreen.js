import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import Card from '../../components/UI/Card';

const CartScreen = (props) => {
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
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <DefaultText style={styles.summaryText}>
          Oбща сума:{' '}
          <DefaultText style={styles.amount}>
            {Math.round(cartTotalAmount.toFixed(2) * 100) / 100}лв
          </DefaultText>
        </DefaultText>
        <Button
          title="Плащане"
          color={Colors.accentColor}
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() =>
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }
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
