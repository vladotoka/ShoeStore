import Order from '../../models/order';
export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://rn-complete-guide-30882-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error('Упс! Нещо не е наред със заявката!');
      }

      //firebase GET request returns: {"id": {cartItems: ,date: ,totalAmount}, "id": ...}
      const resData = await response.json();
      //converting to array
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          // class Order { constructor(id, items, totalAmount, date)
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://rn-complete-guide-30882-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Упс! Нещо се обърка при записа на поръчка...');
    }

    //firebase връща ид на новия запис с отговора в ключ "name":
    const resData = await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
