import React from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome5 } from '@expo/vector-icons';

import DefaultText from '../../components/DefaultText';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';


const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editItemHandler = (id) => {
    //
    const title = id ? 'редакция' : 'нов продукт';
    props.navigation.navigate('EditProduct', {productId: id, headerTitle: title});
  }

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => {
              editItemHandler(false);
            }}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'menu-sharp' : 'ios-menu'}
            onPress={() => {
              props.navigation.openDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation]);

  return (
    <View style={styles.screen}>
      <DefaultText style={styles.text}>екран НАСТРОЙКИ ПРОДУКТИ</DefaultText>
      <FlatList
        data={userProducts}
        renderItem={(itemData) => (
          <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {}}
            onSelect={() => {editItemHandler(itemData.item.id)}}
          >
            <Button
              color={Colors.primaryColor}
              title="промени"
              onPress={() => {
                editItemHandler(itemData.item.id);
              }}
            />
            <Button
              color={Colors.primaryColor}
              title="изтрий"
              onPress={() => {
                dispatch(productsActions.deleteProduct(itemData.item.id));
              }}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  text: {
    color: Colors.primaryColor,
    fontSize: 35,
  },
});

export default UserProductsScreen;
