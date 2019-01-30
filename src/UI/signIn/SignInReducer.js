import { SignInActionTypes } from './SignInConstants';

const initialState = {
  loading: false,
  error: '',
  data: {},
};

export default function signInReducer(state = initialState, action) {
  const { type, payload } = action;
  const { data, error } = payload || {};
  const { access_token, user = {} } = data || {};

  switch(type) {
    case SignInActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SignInActionTypes.LOGIN_SUCCESS:
      if(data.hasOwnProperty('access_token')) {
        const { username, first_name, last_name, id } = user;

        // TODO: Use constants instead of hard-coded string literals
        localStorage.access_token = access_token;
        localStorage.username = username;
        localStorage.first_name = first_name;
        localStorage.last_name = last_name;
        localStorage.userID = id;
      }

      return {
        ...state,
        error: '',
        loading: false,
        token: data.access_token,
      };

    case SignInActionTypes.LOGOUT:
      // TODO: Use constants instead of hard-coded string literals
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      localStorage.removeItem('userID');
      localStorage.removeItem('first_name');
      localStorage.removeItem('last_name');

      return {
        loading: false,
        error: '',
        data: {},
      };

    case SignInActionTypes.LOGIN_INCORRECT_DATA_PROVIDED:
      return {
        ...state,
        error: '',
        loading: false,
      };

    case SignInActionTypes.LOGIN_ERROR:
      return {
        ...state,
        error: error.message,
        loading: false,
      };

    case SignInActionTypes.CHANGE_TOKEN:
      localStorage.access_token = access_token;

      return state;

    default:
      return state;

  }
}