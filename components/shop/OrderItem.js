import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log(props.props42);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{props.amount.toFixed(2)}лв</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Скрий подробности' : 'Виж подробно'}
        onPress={() => {
          setShowDetails((current) => !current);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: 'ubuntuBold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'ubuntu',
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});

export default OrderItem;
