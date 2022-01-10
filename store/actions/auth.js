export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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

    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
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

    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};

export const logout = () => {
  return { type: LOGOUT };
};
