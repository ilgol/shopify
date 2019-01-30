import React from 'react';
import PackageDetails from '../PackageDetails';
import Store from '../../store/Store';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');

  shallow(
    <Provider store={ Store }>
      <PackageDetails
        route={ { name: 'test' } }
        packageDetailsActions={ {} }
        packageDetails={ {
          details: {
            id: 0,
            package_number: 0,
            status: 'string',
            user_ebox_location_id: 0,
            updated_by: 0,
            updated_at: '2017-12-21T18:34:51.028Z',
            ordered_date: '',
            shipped_date: '',
            in_location_date: '',
            delivered_date: '',
            picked_up_date: '',
            description: 'string',
            name: 'string',
            sender_name: 'string',
            sender_phone: 'string',
            sender_state: 'string',
            sender_state_id: 'string',
            sender_country_id: 'string',
            user_id: 0,
            user_ebox_location: {
              name: '',
              ebox_location: {
                location_name: '',
                address: '',
                phone: '',
                latitude: 0,
                longitude: 0,
              },
            },
          },
        } }
      />
    </Provider>
    , div);
});