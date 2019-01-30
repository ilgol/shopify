import * as sagas from '../SignInSagas';
import { processRequest } from '../../services/Api';
import { put, call } from 'redux-saga/effects';
import * as signInActions from '../SignInActions';
import { replace } from 'react-router-redux';
import * as notificationActions from '../../components/notification/NotificationActions';
import { handleError } from '../../services/SagasErrorHandler';
import { ROLES } from '../../services/Constants';

describe('SignIn login request tests', () => {
  const action = {
    payload: {
      username: 'asd@asd.com',
      password: '123456',
    },
  };

  const requestPayload = {
    username: action.payload.username,
    password: action.payload.password,
  };

  it('Should successfully done login request saga (toke is exist)', () => {
    const responseMock = {
      data: {
        access_token: 'test',
        user: {
          role: {
            role_id: ROLES.SystemOwner,
          },
        },
      },
    };
    const generator = sagas.handleLoginRequest(action);

    let next = generator.next();

    expect(next.value).toEqual(call(processRequest, 'authentication', 'POST', requestPayload));

    next = generator.next(responseMock);
    expect(next.value).toEqual(put(signInActions.loginSuccess(responseMock.data)));

    next = generator.next();
    expect(next.value).toEqual(put(replace('/')));

    next = generator.next();
    expect(next.done).toEqual(true);
  });

  it('Should prevent login for not admin account', () => {
    const responseMock = {
      data: {
        access_token: 'test',
        user: {
          role: {
            role_id: ROLES.Client,
          },
        },
      },
    };
    const generator = sagas.handleLoginRequest(action);

    let next = generator.next();

    expect(next.value).toEqual(call(processRequest, 'authentication', 'POST', requestPayload));

    next = generator.next(responseMock);
    expect(next.value).toEqual(put(signInActions.loginIncorrectDataProvided()));

    next = generator.next();
    expect(next.value).toEqual(put(notificationActions.createNotification('Oops! Looks like you have no admin permissions', true)));

    next = generator.next();
    expect(next.done).toEqual(true);
  });

  it('Should  successfully done login request saga (invalid data provided)', () => {
    const generator = sagas.handleLoginRequest(action);

    let next = generator.next();

    expect(next.value).toEqual(call(processRequest, 'authentication', 'POST', requestPayload));

    next = generator.next({ data: {} });
    expect(next.value).toEqual(put(signInActions.loginIncorrectDataProvided()));

    next = generator.next();
    expect(next.value).toEqual(put(notificationActions.createNotification('Username or Password is incorrect!', true)));

    next = generator.next();
    expect(next.done).toEqual(true);
  });

  it('Should fails login request saga in case of an exception', () => {
    const generator = sagas.handleLoginRequest({ payload: { user: {} } });

    let next = generator.next();

    expect(next.value).toEqual(call(processRequest, 'authentication', 'POST', {}));

    next = generator.throw(new Error('500 Internal Server Error'));
    expect(next.value).toEqual(call(handleError, new Error('500 Internal Server Error'), 'Error during sign in!'));

    next = generator.next();
    expect(next.value).toEqual(put(signInActions.loginError(new Error('500 Internal Server Error'))));

    next = generator.next();
    expect(next.done).toEqual(true);
  });
});
