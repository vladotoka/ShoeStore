import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <View>
      <Text>екран Поръчки</Text>
      <FlatList
        data={orders}
        renderItem={(itemData) => (
            <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items} props42={itemData.item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    fontSize: 35,
  },
});

export default OrdersScreen;
