import { processRequestForShopify } from '../../services/Api';
import { put, call, takeLatest, all } from 'redux-saga/effects';
import { ShippingActionTypes } from './ShippingsConstants';
import * as shippingActions from './ShippingsActions';
import { handleError } from '../../services/SagasErrorHandler';

export default function* () {
  yield all([
    yield takeLatest(ShippingActionTypes.SHIPPINGS_REQUEST, handleGetShippingsRequest),
  ]);
}

export function* handleGetShippingsRequest(action) {
  try {
    const { address } = action.payload;
    const url = `/cart/shipping_rates.json?` +
      `shipping_address[zip]=${ address.zip }&` +
      `shipping_address[country]=${ address.country }&` +
      `shipping_address[province]=${ address.province }&` +
      `shipping_address[city]=${ address.city }&` +
      `shipping_address[street]=${ address.street }`;

    const { data } = yield call(processRequestForShopify, url);

    yield put(shippingActions.getShippingsSuccess(data.shipping_rates));
  } catch(e) {
    yield call(handleError, e, 'Error during getting available shipping methods!');
    yield put(shippingActions.getShippingsError(e));
  }
}