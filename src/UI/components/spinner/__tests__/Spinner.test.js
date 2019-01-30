import React from 'react';
import ReactDOM from 'react-dom';
import SpinnerGrid from '../SpinnerGrid';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<SpinnerGrid isShow={ false } />, div);
});
