import uuidv4 from 'uuid/v4';
import _findIndex from 'lodash/findIndex';
import { notificationActionTypes } from './NotificationConstants';

const initialState = {
  messages: [],
};

const findSameMessageIndex = (state, message, error, warning) => _findIndex(state.messages, item => (
  item.message === message && item.error === error && item.warning === warning
));

export default function notificationReducer(state = initialState, action) {
  const { type, payload } = action;
  const { id, message, error, warning, isNeedRedirect } = payload || {};

  switch(type) {
    case notificationActionTypes.CREATE_NOTIFICATION_MESSAGE:
      const sameMessageIndex = findSameMessageIndex(state, message, error, warning);
      const newMessage = {
        id: uuidv4(),
        message,
        error,
        warning,
        isNeedRedirect,
      };
      const messages = [...state.messages];

      if(sameMessageIndex !== -1)
        messages.splice(sameMessageIndex, 1);
      messages.push(newMessage);

      return {
        ...state,
        messages,
      };

    case notificationActionTypes.NOTIFICATION_MESSAGE_REMOVE:
      return {
        ...state,
        messages: state.messages.reduce((accumulator, item) => {
          if(item.id === id)
            return accumulator;

          return [...accumulator, item];
        }, []),
      };

    default:
      return state;
  }
}
