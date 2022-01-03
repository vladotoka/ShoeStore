export const SIGNUP = 'SIGNUP';

export const signup = (email, password) => {
    console.log('store/actions/auth', email, password);
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
      throw new Error('Нещо се обърка');
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({ type: SIGNUP });
  };
};
