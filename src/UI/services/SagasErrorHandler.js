import { put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as NotificationActions from '../components/notification/NotificationActions';
import { STATUS_TEXT as RESPONSE_STATUS_TEXT } from '../services/ResponseData';
import * as SignInActions from '../signIn/SignInActions';

export function* handleUnauthenticatedErrors(error, notification) {
  const { response: { data } } = error;

  if(!data || !data.message) {
    yield put(SignInActions.logout());
    yield put(push('/'));
    yield put(NotificationActions.createNotification('Your session had been expired. Please Sign in again.', true));
  } else
    yield put(NotificationActions.createNotification(notification, true));
}

export function* handleUnauthorizedError(error) {
  const { response: { data } } = error;

  if((data && data.message) || (data.response && data.response.message))
    yield put(NotificationActions.createNotification(data.message || data.response.message, true));
  else
    yield put(NotificationActions.createNotification('Oops! Looks like you have no permissions to do this.', true));
}

export function* handleError(error, notification) {
  const errorResponse = error && error.response;

  if(
    errorResponse &&
    error.response.status === 401 &&
    error.response.statusText === RESPONSE_STATUS_TEXT.unauthorized
  )
    yield handleUnauthenticatedErrors(error, notification);
  else if(errorResponse && errorResponse.status === 403)
    yield handleUnauthorizedError(error, notification);
  else
    yield put(NotificationActions.createNotification(notification, true));
}

export function handleErrorMessage(response) {
  let message = 'Error during updating Employee profile!';

  if(response && response.status === 422 && response.data) {
    const { errors = [] } = response.data;

    message = errors.length
      ? (
        errors
          .map(item => item.message)
          .join(' ')
          .replace(/username/g, 'email')
      )
      : (
        message
      );
  }

  return message;
}
