import React from 'react';
import ReactDOM from 'react-dom';
import InputComponent from '../InputComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <InputComponent
      placeholder="Search"
    />, div);
});
