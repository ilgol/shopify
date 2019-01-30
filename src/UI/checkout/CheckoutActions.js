import { CheckoutActionTypes } from './CheckoutConstants';

export function postCheckoutRequest(location, shippingId) {
  return {
    type: CheckoutActionTypes.POST_CHECKOUT_REQUEST,
    payload: {
      location,
      shippingId,
    },
  };
}

export function checkoutRequestSuccess(dataResponse) {
  return {
    type: CheckoutActionTypes.CHECKOUT_REQUEST_SUCCESS,
    payload: {
      dataResponse,
    },
  };
}

export function checkoutRequestError(error) {
  return {
    type: CheckoutActionTypes.CHECKOUT_REQUEST_ERROR,
    payload: {
      error,
    },
  };
}