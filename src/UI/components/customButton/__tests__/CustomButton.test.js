import React from 'react';
import ReactDOM from 'react-dom';
import ButtonCustom from '../CustomButton';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ButtonCustom />, div);
});
