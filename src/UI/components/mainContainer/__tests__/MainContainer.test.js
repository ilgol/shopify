import React from 'react';
import MainContainer from '../MainContainer';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Store from '../../../store/Store';

it('renders without crashing', () => {
  shallow(
    <Provider store={ Store }>
      <MainContainer
        location={ {} }
        history={ {} }
      />
    </Provider>, document.createElement('div'));
});