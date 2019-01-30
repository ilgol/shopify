import { processRequest, processRequestForShopify } from '../../services/Api';
import { put, call, takeLatest, all } from 'redux-saga/effects';
import { LocationsActionTypes } from './LocationsConstants';
import * as locationsActions from './LocationsActions';
import { handleError } from '../../services/SagasErrorHandler';
import { getUrl } from '../../services/GetUrl';

export default function* () {
  yield all([
    yield takeLatest(LocationsActionTypes.EBOX_USER_LOCATIONS_REQUEST, handleGetUserLocationsRequest),
    yield takeLatest(LocationsActionTypes.CART_ITEMS_REQUEST, handleGetCartItemsRequest),
  ]);
}

export function* handleGetUserLocationsRequest(action) {
  try {
    const id = localStorage.userID;
    const url = getUrl(
      `users/${id}/locations`,
      'active',
      'ebox_location',
    );

    const responseData = yield call(processRequest, url);

    yield put(locationsActions.getUserLocationsSuccess(responseData));
  } catch(e) {
    yield call(handleError, e, 'Error during getting locations!');
    yield put(locationsActions.getUserLocationsError(e));
  }
}

export function* handleGetCartItemsRequest(action) {
  try {
    const url = '/cart.json';

    const { data } = yield call(processRequestForShopify, url);

    yield put(locationsActions.getCartItemsSuccess(data.item_count));
  } catch(e) {
    yield call(handleError, e, 'Error during getting cart items!');
    yield put(locationsActions.getCartItemsError(e));
  }
}