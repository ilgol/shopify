import { LocationsActionTypes } from './LocationsConstants';

export function getUserLocationsRequest() {
  return {
    type: LocationsActionTypes.EBOX_USER_LOCATIONS_REQUEST,
  };
}

export function getUserLocationsSuccess(dataResponse) {
  return {
    type: LocationsActionTypes.EBOX_USER_LOCATIONS_SUCCESS,
    payload: {
      dataResponse,
    },
  };
}

export function getUserLocationsError(error) {
  return {
    type: LocationsActionTypes.EBOX_USER_LOCATIONS_ERROR,
    payload: {
      error,
    },
  };
}

export function getCartItemsRequest() {
  return {
    type: LocationsActionTypes.CART_ITEMS_REQUEST,
  };
}

export function getCartItemsSuccess(dataResponse) {
  return {
    type: LocationsActionTypes.CART_ITEMS_SUCCESS,
    payload: {
      dataResponse,
    },
  };
}

export function getCartItemsError(error) {
  return {
    type: LocationsActionTypes.CART_ITEMS_ERROR,
    payload: {
      error,
    },
  };
}

export function selectLocation(id) {
  return {
    type: LocationsActionTypes.EBOX_SELECT_LOCATION,
    payload: {
      id,
    },
  };
}

export function resetState() {
  return {
    type: LocationsActionTypes.LOCATIONS_RESET_STATE,
  };
}
