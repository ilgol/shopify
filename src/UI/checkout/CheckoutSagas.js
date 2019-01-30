import { processRequestForShopify } from '../services/Api';
import { put, call, takeLatest, all } from 'redux-saga/effects';
import { CheckoutActionTypes } from './CheckoutConstants';
import * as checkoutActions from './CheckoutActions';
import { handleError } from '../services/SagasErrorHandler';
import { BASE_API_URL_FOR_SHOPIFY } from '../services/Constants';
import { pick } from '../services/Helper';

export default function* () {
  yield all([
    yield takeLatest(CheckoutActionTypes.POST_CHECKOUT_REQUEST, handlePostCheckoutRequest),
  ]);
}

export function* handlePostCheckoutRequest(action) {
  try {
    const { payload } = action;
    const { location, shippingId } = payload;
    const url = '/cart.json';

    const { data: cartData } = yield call(processRequestForShopify, url);

    const requestPayload = {
      location,
      shippingId,
      first_name: localStorage.first_name,
      last_name: localStorage.last_name,
      username: localStorage.username,
      cart: cartData.items.map(row => pick(row, ['variant_id', 'quantity', 'product_description'])),
    };

    const { data } = yield call(processRequestForShopify, `${ BASE_API_URL_FOR_SHOPIFY }create_checkout`, 'POST', requestPayload);

    yield put(checkoutActions.checkoutRequestSuccess(data));
  } catch(e) {
    yield call(handleError, e, 'Error during creating checkout!');
    yield put(checkoutActions.checkoutRequestError(e));
  }
}