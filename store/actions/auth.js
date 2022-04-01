import AsyncStorage from '@react-native-async-storage/async-storage';

import { keys } from '../../env/keys';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';

let timer;

// export const authenticate = (userId, token) => {
//   return { type: AUTHENTICATE, userId: userId, token: token };
// };

export const authenticate = (userId, token, expiryTime) => {
	return (dispatch) => {
		dispatch(setLogoutTimer(expiryTime));
		dispatch({ type: AUTHENTICATE, userId: userId, token: token });
	};
};

export const signup = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keys.firebaseWebAPIkey}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = `Нещо се обърка. Отговор на сървъра:${errorId}`;
			if (errorId === 'EMAIL_EXISTS') {
				message = 'Този email е вече е използван';
			} else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
				message = 'Твърде много неуспешни опити, опитайте малко по-късно...';
			}

			throw new Error(message);
		}

		const resData = await response.json();

		dispatch(
			authenticate(
				resData.localId,
				resData.idToken,
				parseInt(resData.expiresIn) * 1000
			)
		);

		const expirationDate = new Date(
			new Date().getTime() + parseInt(resData.expiresIn) * 1000
		);
		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keys.firebaseWebAPIkey}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = `Нещо се обърка. Отговор на сървъра:${errorId}`;
			if (errorId === 'EMAIL_NOT_FOUND') {
				message = '😼 Не открихме този e-mail в базата ни.';
			} else if (errorId === 'INVALID_EMAIL') {
				message = '😼 Това не изглежда като валиден e-mail';
			} else if (errorId === 'INVALID_PASSWORD') {
				message = '😼 Тази парола е грешна ^^';
			} else if (errorId === 'MISSING_PASSWORD') {
				message = '😼 Не сте въвели парола';
			}

			throw new Error(message);
		}

		const resData = await response.json();

		dispatch(
			authenticate(
				resData.localId,
				resData.idToken,
				parseInt(resData.expiresIn) * 1000
			)
		);
		const expirationDate = new Date(
			new Date().getTime() + parseInt(resData.expiresIn) * 1000
		);
		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

export const logout = () => {
	clearLogoutTimer();
	saveDataToStorage(null, null, new Date());
	return { type: LOGOUT };
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

//set timer for autologout when the token expires
const setLogoutTimer = (expirationTime) => {
	return (dispatch) => {
		timer = setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

//saving user data to async storage
const saveDataToStorage = async (token, userId, expirationDate) => {
	try {
		await AsyncStorage.setItem(
			'userData',
			JSON.stringify({
				token: token,
				userId: userId,
				expiryDate: expirationDate.toISOString(),
			})
		);
	} catch (e) {
		// saving error
		alert(
			`Неуспешен запис на данни в паметта на устойството! response error :${e} `
		);
	}
};
