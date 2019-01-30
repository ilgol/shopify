import { ShippingActionTypes } from './ShippingsConstants';

const initialState = {
  selectedId: '',
  loading: true,
  shippings: [],
};

export default function shippingsReducer(state = initialState, action) {
  const { type, payload } = action;
  const { id, dataResponse } = payload || {};

  switch(type) {
    case ShippingActionTypes.SHIPPINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ShippingActionTypes.SHIPPINGS_SUCCESS:
      return {
        ...state,
        shippings: dataResponse,
        loading: false,
      };

    case ShippingActionTypes.SHIPPINGS_ERROR:
      return {
        ...state,
        loading: false,
      };

    case ShippingActionTypes.SHIPPINGS_SELECT:
      return {
        ...state,
        selectedId: id,
      };

    default:
      return state;
  }
}
