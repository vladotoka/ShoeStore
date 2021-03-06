import Product from '../../models/product';
import * as Notifications from 'expo-notifications';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
	return async (dispatch, getState) => {
		//any async code
		const userId = getState().auth.userId;
		const token = getState().auth.token;

		//'https://rnstore-7944a-default-rtdb.europe-west1.firebasedatabase.app/products.json'
		//WE NOW SEND AUTH TOKEN with this reаd products request-причина ограничаване достъп firebase Realtime Database с rules

		try {
			const response = await fetch(
				`https://rnstore-7944a-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`
			);

			if (!response.ok) {
				throw new Error('Нещо не е наред със заявката!');
			}

			//firebase GET request returns: {"pid1": {product DATA}, "pid2": {product DATA}, ..}
			const resData = await response.json();
			//converting to array
			const loadedProducts = [];
			for (const key in resData) {
				loadedProducts.push(
					new Product(
						key,
						resData[key].ownerId,
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price
					)
				);
			}

			dispatch({
				type: SET_PRODUCTS,
				products: loadedProducts,
				userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
			});
		} catch (err) {
			//send to custom analytics server
			throw err;
		}
	};
};

export const deleteProduct = (productID) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const response = await fetch(
			`https://rnstore-7944a-default-rtdb.europe-west1.firebasedatabase.app/products/${productID}.json?auth=${token}`,
			{
				method: 'DELETE',
			}
		);

		if (!response.ok) {
			throw new Error('Упс! Нещо се обърка...');
		}

		dispatch({ type: DELETE_PRODUCT, pid: productID });
	};
};

export const createProduct = (title, description, imageUrl, price) => {
	return async (dispatch, getState) => {
		//any async code
		//retrieve user expo push token
		let pushToken;

		//if the user not granted permision  pushToken = null
		if (false) {
			pushToken = null;
		} else {
			pushToken = (await Notifications.getExpoPushTokenAsync()).data;
		}

		//get firebase user token and id from state
		const token = getState().auth.token;
		const userId = getState().auth.userId;

		const response = await fetch(
			`https://rnstore-7944a-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					description,
					imageUrl,
					price,
					ownerId: userId,
					ownerPushToken: pushToken,
				}),
			}
		);

		if (!response.ok) {
			throw new Error('Упс! Нещо се обърка...');
		}

		//firebase връща ид на новия запис с отговора в ключ "name":
		const resData = await response.json();

		dispatch({
			type: CREATE_PRODUCT,
			productData: {
				id: resData.name,
				title,
				description,
				imageUrl,
				price,
				ownerId: userId,
			},
		});
	};
};

export const updateProduct = (id, title, description, imageUrl) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const response = await fetch(
			`https://rnstore-7944a-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title, description, imageUrl }),
			}
		);

		if (!response.ok) {
			throw new Error('Упс! Нещо се обърка...');
		}

		dispatch({
			type: UPDATE_PRODUCT,
			pid: id,
			productData: {
				title,
				description,
				imageUrl,
			},
		});
	};
};
