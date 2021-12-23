import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';

const EditProductScreen = (props) => {
  const { productId } = props.route.params; //nav v6 destruct
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
  console.log(editedProduct);
  // if (props.route.params.productId) {
  //   console.log('с ИД->режим ред');
  //   // setTitle(editedProduct.title);
  //   // setImage(editedProduct.imageUrl);
  //   // setPrice(editedProduct.price);
  //   // setDescription(editedProduct.description);
  // }

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
              alert('запиши');
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation]);

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
