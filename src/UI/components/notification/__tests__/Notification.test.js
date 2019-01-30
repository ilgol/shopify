import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Notification from '../Notification';
import { configureStore } from '../../../store/Store';

const store = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Provider store={ store }><Notification notification={ {} } /></Provider>, div);
});
