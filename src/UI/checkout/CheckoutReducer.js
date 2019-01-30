import { CheckoutActionTypes } from './CheckoutConstants';

const initialState = {
  checkoutUrl: '',
  loading: false,
  isRedirected: true,
};

export default function checkoutReducer(state = initialState, action) {
  const { type, payload } = action;
  const { dataResponse } = payload || {};

  switch(type) {
    case CheckoutActionTypes.POST_CHECKOUT_REQUEST:
      return {
        ...state,
        loading: true,
        isRedirected: true,
      };

    case CheckoutActionTypes.CHECKOUT_REQUEST_SUCCESS:
      return {
        ...state,
        checkoutUrl: dataResponse,
        isRedirected: false,
        loading: false,
      };

    case CheckoutActionTypes.CHECKOUT_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        isRedirected: false,
      };

    default:
      return state;
  }
}
