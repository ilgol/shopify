import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import signInReducer from './signIn/SignInReducer';
import notificationReducer from './components/notification/NotificationReducer';
import locationsReducer from './components/locations/LocationsReducer';
import shippingsReducer from './components/shippings/ShippingsReducer';
import checkoutReducer from './checkout/CheckoutReducer';

export default combineReducers({
  routing,
  form: formReducer,
  signInReducer,
  notificationReducer,
  locationsReducer,
  shippingsReducer,
  checkoutReducer,
});
