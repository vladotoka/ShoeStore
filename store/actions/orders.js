export const ADD_ORDER = 'ADD_ORDER';
export const REMOVE_ORDER = 'REMOVE_ORDER';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      'https://rn-complete-guide-30882-default-rtdb.europe-west1.firebasedatabase.app/orders/u1.jon',
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
    console.log(resData);
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

export const removeOrder = (orderId) => {
  return { type: REMOVE_ORDER, orderId: orderId };
};
