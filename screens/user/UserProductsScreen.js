import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editItemHandler = (id) => {
    const title = id ? 'редакция' : 'нов продукт';
    props.navigation.navigate('EditProduct', {
      productId: id,
      headerTitle: title,
    });
  };

  const deleteHandler = (pid) => {
    Alert.alert(
      'Необходимо е потвърждение!',
      'Потвърждавате ли избора си да изтриете този продукт?',
      [
        { text: 'Не', style: 'default' },
        {
          text: 'Да',
          style: 'destructive',
          onPress: () => {
            secondDeleteHandler(pid);
          },
        },
      ]
    );
  };

  const secondDeleteHandler = async (pid) => {
    try {
      setIsLoading(true);
      await dispatch(productsActions.deleteProduct(pid));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Грешка', err.message, [{ text: 'Добре' }]);
    }
  };

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={userProducts}
        renderItem={(itemData) => (
          <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {}}
            onSelect={() => {
              editItemHandler(itemData.item.id);
            }}
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
                deleteHandler(itemData.item.id);
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProductsScreen;
