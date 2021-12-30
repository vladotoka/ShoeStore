import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    //any async code
    try {
      const response = await fetch(
        'https://rn-complete-guide-30882-default-rtdb.europe-west1.firebasedatabase.app/products.json'
      );

      if(!response.ok) {

        throw new Error('Нещо не е наред със заявката!')
      }

      //firebase GET request returns: {"pid1": {product DATA}, "pid2": {product DATA}, ..}
      const resData = await response.json();
      console.log(resData);
      //converting to array
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      //send to custom analytics server
      throw err;
    }
  };
};

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
