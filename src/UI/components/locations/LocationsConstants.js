import keyMirror from 'keymirror';
import { APP_URL } from '../../services/Constants';

export const LocationsActionTypes = keyMirror(
  {
    EBOX_USER_LOCATIONS_REQUEST: null,
    EBOX_USER_LOCATIONS_SUCCESS: null,
    EBOX_USER_LOCATIONS_ERROR: null,
    EBOX_SELECT_LOCATION: null,
    CART_ITEMS_REQUEST: null,
    CART_ITEMS_SUCCESS: null,
    CART_ITEMS_ERROR: null,
  }
);

export const LOCATION_CREATE_URL = `${APP_URL}/#/locations/new`;