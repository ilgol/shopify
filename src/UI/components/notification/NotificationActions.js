import { notificationActionTypes } from './NotificationConstants';

export function createNotification(message, error = false, warning = false, isNeedRedirect = false) {
  return {
    type: notificationActionTypes.CREATE_NOTIFICATION_MESSAGE,
    payload: {
      message,
      error,
      warning,
      isNeedRedirect,
    },
  };
}

export function removeNotification(id) {
  return {
    type: notificationActionTypes.NOTIFICATION_MESSAGE_REMOVE,
    payload: {
      id,
    },
  };
}
