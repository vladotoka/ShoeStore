export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (productID) => {
  return { type: DELETE_PRODUCT, pid: productID };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    //async code
    const response = await fetch(
      'https://rn-complete-guide-30882-default-rtdb.europe-west1.firebasedatabase.app/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );
    //firebase връща ид на новия запис с отговора в ключ "name":
    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
