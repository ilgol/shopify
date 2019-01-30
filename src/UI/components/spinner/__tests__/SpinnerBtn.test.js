import React from 'react';
import ReactDOM from 'react-dom';
import SpinnerBtn from '../SpinnerBtn';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<SpinnerBtn isShow={ false } />, div);
});
