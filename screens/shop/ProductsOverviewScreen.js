import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import DefaultText from '../../components/DefaultText';

import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(
    async (flatListReload = false) => {
      setError(null);
      if (flatListReload === true) {
        setIsReloading(true);
      } else {
        setIsLoading(true);
      }
      try {
        await dispatch(productsActions.fetchProducts());
      } catch (err) {
        setError(err.message);
      }
      if (flatListReload === true) {
        setIsReloading(false);
      } else {
        setIsLoading(false);
      }
    },
    [dispatch, setIsLoading, setError]
  );

  //презареждане да продуктите от сървъра при всяко отваряне на екарана (т.к. reactnavigation не пресъздава копмпонентите всеки път )
  useEffect(() => {
    const willFocusSub = props.navigation.addListener('focus', loadProducts);
    return willFocusSub;
  }, [loadProducts]);
  //FIXME проверка на клийнър функцията

  // useEffect(() => {
  //   loadProducts();
  // }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetails', {
      productId: id,
      productName: title,
    });
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              props.navigation.navigate('Cart', { sendSomething: 42 });
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

  if (error) {
    return (
      <View style={styles.centered}>
        <DefaultText style={{ fontSize: 18 }}>Възникна грешка!</DefaultText>
        <DefaultText>{error}</DefaultText>
        <Button
          title="презареди"
          onPress={loadProducts}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultText>
          Няма продукти. Добавете нови от меню администартор.
        </DefaultText>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts.bind(this, true)}
      refreshing={isReloading}
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primaryColor}
            title="подробности"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primaryColor}
            title="купи"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
