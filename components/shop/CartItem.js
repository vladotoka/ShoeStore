import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CartItem = (props) => {
  
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title} </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{props.amount.toFixed(2)}лв</Text>
        <TouchableOpacity
          onPress={props.onRemove}
          style={styles.deleteButton}
        >
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'ubuntu',
    color: '#888',
    fontSize: 14,
  },
  mainText: {
    fontFamily: 'ubuntuBold',
    fontSize: 14,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
