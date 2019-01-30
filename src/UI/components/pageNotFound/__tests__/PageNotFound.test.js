import React from 'react';
import PageNotFound from '../PageNotFound';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');

  shallow(
    <PageNotFound />,
    div);
});
