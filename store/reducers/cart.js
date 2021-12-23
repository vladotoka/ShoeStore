import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';

import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        //this item still is not in the cart
        //MODEL: constructor(quantity, productPrice, productTitle, sum)
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const idToRemove = state.items[action.pid];
      let updatedCartItems;

      //повече от 1бр на маркирания продукт -> намали с един
      if (idToRemove.quantity > 1) {
        const updatedCartItem = new CartItem(
          idToRemove.quantity - 1,
          idToRemove.productPrice,
          idToRemove.productTitle,
          idToRemove.sum - idToRemove.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        //selected product is only 1pcs, remove prod key from state.items
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: { ...updatedCartItems },
        totalAmount: state.totalAmount - idToRemove.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if(!state.items[action.pid]) {
        return state;
      }
      const updatedItems = {...state.items};
      const itemTotal = updatedItems[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      }
  }
  return state;
};
