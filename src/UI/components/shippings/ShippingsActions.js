import { ShippingActionTypes } from './ShippingsConstants';

export function getShippingsRequest(address) {
  return {
    type: ShippingActionTypes.SHIPPINGS_REQUEST,
    payload: {
      address,
    },
  };
}

export function getShippingsSuccess(dataResponse) {
  return {
    type: ShippingActionTypes.SHIPPINGS_SUCCESS,
    payload: {
      dataResponse,
    },
  };
}

export function getShippingsError(error) {
  return {
    type: ShippingActionTypes.SHIPPINGS_ERROR,
    payload: {
      error,
    },
  };
}

export function selectShipping(id) {
  return {
    type: ShippingActionTypes.SHIPPINGS_SELECT,
    payload: {
      id,
    },
  };
}
