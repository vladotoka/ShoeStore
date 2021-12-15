import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <View>
      <Text>екран Поръчки</Text>
      <FlatList
        data={orders}
        renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  text: {
    fontSize: 35,
  },
});

export default OrdersScreen;
