import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import DefaultText from '../../components/DefaultText';

import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  if (orders.length === 0) {
    return (
      <View>
        <DefaultText style={styles.text}>Упс! Нямате никакви поръчки.</DefaultText>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
  },
});

export default OrdersScreen;
