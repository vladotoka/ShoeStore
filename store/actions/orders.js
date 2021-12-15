export const ADD_ORDER = 'ADD_ORDER';
export const REMOVE_ORDER = 'REMOVE_ORDER';

export const addOrder = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount },
  };
};

export const removeOrder = (orderId) => {
  return { type: REMOVE_ORDER, orderId: orderId };
};
