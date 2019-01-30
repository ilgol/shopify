import keyMirror from 'keymirror';

export const SignInActionTypes = keyMirror(
  {
    LOGIN_REQUEST: null,
    LOGIN_SUCCESS: null,
    LOGIN_ERROR: null,
    LOGOUT: null,
    LOGOUT_ERROR: null,
    LOGIN_INCORRECT_DATA_PROVIDED: null,
    CHANGE_TOKEN: null,
  }
);