import AsyncStorage from '@react-native-async-storage/async-storage';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';

let timer;

// export const authenticate = (userId, token) => {
//   return { type: AUTHENTICATE, userId: userId, token: token };
// };

export const authenticate = (userId, token, expiryTime = 42000) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  console.log('store/actions/auth-signup', email, password);
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-C-zhGiQRr2ttkqxqS-f-VQHEPURXc9w',
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
      console.log(errorResData);
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
    console.log(resData);

    // dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
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
  console.log('store/actions/auth-signin', email, password);
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-C-zhGiQRr2ttkqxqS-f-VQHEPURXc9w',
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
      console.log(errorResData);
      const errorId = errorResData.error.message;
      let message = `Нещо се обърка. Отговор на сървъра:${errorId}`;
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'Не открихме този e-mail';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = '😼 Тази парола е грешна ^^';
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    // dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
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

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

//user data to async storage
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
  console.log('saved to asyncStorage');
  readDataFromStorage();
};

//TEMP storage check
const readDataFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userData');
    const parsedValue = JSON.parse(jsonValue);

    console.log(`reading AsyncStorage expDAte: ${parsedValue.expiryDate}`);
    console.log(`reading AsyncStorage userId: ${parsedValue.userId}`);
    console.log(`reading AsyncStorage token: ${parsedValue.token}`);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    alert(
      `Неуспешно четене на данни от паметта на устойството! response error :${e} `
    );
  }
};
