import React from 'react';
import { shallow } from 'enzyme';
import SignIn from '../SignIn';
import { Provider } from 'react-redux';
import { configureStore } from '../../store/Store';

const store = configureStore();
const localStorageMock = {
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

it('renders without crashing', () => {
  global.localStorage.access_token = '711d17a605a148b28c35632810314e70';
  shallow(
    <Provider store={ store }>
      <SignIn
        handleSubmit={ jest.fn() }
        signInActions={ {} }
        signIn={ {} }
        appReducer={ {} }
        errorPageActions={ {} }
        history={ { push: jest.fn() } }
        location={ {} }
        signUpActions={ {} }
      />
    </Provider>);
});