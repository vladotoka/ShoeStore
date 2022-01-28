import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';

import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/orders';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders())
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {alert(err.message)});
      //FIXME при reject няма опцция за презареждане и isLoding остава true 
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultText style={styles.text}>
          Упс! Нямате никакви поръчки.
        </DefaultText>
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
    fontSize: 21,
    color: Colors.primaryColor,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersScreen;
