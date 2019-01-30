import React from 'react';
import SignIn from '../SignIn';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { configureStore } from '../../../../store/Store';

const store = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const localStorageMock = {
    getItem: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };

  global.localStorage = localStorageMock;
  shallow(
    <Provider store={ store }>
      <SignIn
        SignInActions={ { formSubmit: jest.fn() } }
        handleSubmit={ jest.fn() }
        invalid
      />
    </Provider>
    , div);
});
