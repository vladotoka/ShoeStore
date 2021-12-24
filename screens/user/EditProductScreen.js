import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/products';

const EditProductScreen = (props) => {
  const { productId } = props.route.params; //nav v6 destruct получава id или false
  const editedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [image, setImage] = useState(
    editedProduct ? editedProduct.imageUrl : ''
  );
  const [prodPrice, setProdPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  );
  const dispatch = useDispatch();

  const submitHandler = (pass) => {
    if (editedProduct) {
      //режим редакция (id, title, description, imageUrl)
      console.log('dispatch edit');
      console.log(`new title:${title} img:${image} descrip:${description} price:${prodPrice} VIKS${pass}`);
      dispatch(productsActions.updateProduct(productId, title, description, image));
    } else {
      //режим нов (title, description, imageUrl, price)
      console.log('dispatch NEWprod');
      console.log(`new title:${title} img:${image} descrip:${description} price:${prodPrice} VIKS${pass}`);
      dispatch(productsActions.createProduct(title, description, image, +prodPrice)); //title, description, imageUrl, price

    }
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={() => {
              submitHandler(42);
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation, title, image, prodPrice, description]);

  return (
    <ScrollView>
      <View>
        <DefaultText style={styles.text}>екран РЕДАКЦИЯ НА ПРОДУКТ</DefaultText>
        {productId && <DefaultText>productId:{productId}</DefaultText>}
      </View>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>име</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>препратка към изображение</Text>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>цена</Text>
            <TextInput
              style={styles.input}
              value={prodPrice}
              onChangeText={setProdPrice}
              keyboardType="numeric"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>описание</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formControl: {},
  // text: {
  //   color: Colors.primaryColor,
  //   fontSize: 35,
  // },
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'ubuntuBold',
    marginVertical: 8,
  },
  input: {
    // paddingHorizontal: 2,
    // paddingVertical: 5,
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
  },
});

export default EditProductScreen;
