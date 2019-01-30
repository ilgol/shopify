import { fork } from 'redux-saga/effects';
import * as signInSagas from './signIn/SignInSagas';
import locationsSagas from './components/locations/LocationsSagas';
import shippingsSagas from './components/shippings/ShippingsSagas';
import checkoutSagas from './checkout/CheckoutSagas';

export default function* rootSaga() {
  yield fork(signInSagas.watchLoginRequest);
  yield fork(locationsSagas);
  yield fork(shippingsSagas);
  yield fork(checkoutSagas);
}