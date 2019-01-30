import { LocationsActionTypes } from './LocationsConstants';

const initialState = {
  selectedId: '',
  loading: true,
  locations: [],
  cartItemsCount: 0,
};

export default function locationsReducer(state = initialState, action) {
  const { type, payload } = action;
  const { id, dataResponse } = payload || {};

  switch(type) {
    case LocationsActionTypes.EBOX_USER_LOCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LocationsActionTypes.EBOX_USER_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: dataResponse.data,
        loading: false,
      };

    case LocationsActionTypes.EBOX_USER_LOCATIONS_ERROR:
      return {
        ...state,
        loading: false,
      };

    case LocationsActionTypes.CART_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LocationsActionTypes.CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartItemsCount: dataResponse,
        loading: false,
      };

    case LocationsActionTypes.CART_ITEMS_ERROR:
      return {
        ...state,
        loading: false,
      };

    case LocationsActionTypes.EBOX_SELECT_LOCATION:
      return {
        ...state,
        selectedId: id,
      };

    case LocationsActionTypes.LOCATIONS_RESET_STATE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
