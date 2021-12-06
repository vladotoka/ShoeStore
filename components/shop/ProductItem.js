import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = (props) => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>{props.price.toFixed(2)} лв</Text>
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primaryColor}
          title="view details"
          onPress={props.onViewDetail}
        />
        <Button
          color={Colors.primaryColor}
          title="Добави"
          onPress={props.onAddToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '20%',
    paddingHorizontal: 20,
  },
  details: {
    alignItems: 'center',
    height: '20%',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
	width: '100%',
	height: '60%',
	borderTopLeftRadius: 10,
	borderTopRightRadius: 10,
	overflow: 'hidden'
  },
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
});

export default ProductItem;
