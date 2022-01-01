import Order from '../../models/order';
import { ADD_ORDER } from '../actions/orders';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      //order constructor( id, items, totalAmount, date)
      //action.orderData: { items: cartItems, amount: totalAmount, id, date },

      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};
