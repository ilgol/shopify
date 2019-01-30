import { processRequest } from '../services/Api';
import { takeEvery } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import { SignInActionTypes } from './SignInConstants';
import * as signInActions from './SignInActions';
import { replace } from 'react-router-redux';
import * as notificationActions from '../components/notification/NotificationActions';
import { handleError } from '../services/SagasErrorHandler';

export function* watchLoginRequest() {
  yield takeEvery(SignInActionTypes.LOGIN_REQUEST, handleLoginRequest);
}

export function* handleLoginRequest(action) {
  try {
    const { username, password } = action.payload;
    const requestPayload = {
      username,
      password,
    };
    const { data } = yield call(processRequest, 'authentication', 'POST', requestPayload);

    if(data.hasOwnProperty('access_token')) {
      yield put(signInActions.loginSuccess(data));
      yield put(replace('/'));
    } else {
      yield put(signInActions.loginIncorrectDataProvided());
      yield put(notificationActions.createNotification('Username or Password is incorrect!', true));
    }
  } catch(e) {
    let message = 'Error during sign in!';

    if(e.response && e.response.data && e.response.data.message)
      message = e.response.data.message;

    yield call(handleError, e, message);
    yield put(signInActions.loginError(e));
  }
}