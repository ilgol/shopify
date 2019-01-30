import React from 'react';
import ReactDOM from 'react-dom';
import NotificationMessage from '../NotificationMessage';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<NotificationMessage message="test" error={ false } />, div);
});
