import keyMirror from 'keymirror';

export const CheckoutActionTypes = keyMirror(
  {
    POST_CHECKOUT_REQUEST: null,
    CHECKOUT_REQUEST_SUCCESS: null,
    CHECKOUT_REQUEST_ERROR: null,
  }
);