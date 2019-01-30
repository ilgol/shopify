import { SignInActionTypes } from './SignInConstants';

export function loginRequest(username, password) {
  return {
    type: SignInActionTypes.LOGIN_REQUEST,
    payload: {
      username,
      password,
    },
  };
}

export function loginSuccess(data) {
  return {
    type: SignInActionTypes.LOGIN_SUCCESS,
    payload: {
      data,
    },
  };
}

export function logout() {
  return {
    type: SignInActionTypes.LOGOUT,
  };
}

export function loginError(error) {
  return {
    type: SignInActionTypes.LOGIN_ERROR,
    error: true,
    payload: {
      error,
    },
  };
}

export function loginIncorrectDataProvided() {
  return {
    type: SignInActionTypes.LOGIN_INCORRECT_DATA_PROVIDED,
  };
}

export function changeToken(token) {
  return {
    type: SignInActionTypes.CHANGE_TOKEN,
    payload: {
      token,
    },
  };
}