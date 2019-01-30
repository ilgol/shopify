import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import ToastMessage from './toastMessage/NotificationMessage';
import * as NotificationActions from './NotificationActions';
import './Notification.css';
// TODO: NOTE: all TODOs should be completed after first priority tasks complete
// TODO: Review and cleanup and improve notification components tree and related files
// TODO: Make smooth mount/unmount(user often see notifications, so it's our joker to make general impression better after customer review)

class Notification extends Component {
  onClickMessage = (id) => {
    this.props.notificationActions.removeNotification(id);
  };

  render() {
    const { messages } = this.props.notification;

    return (
      <div
        className={ classNames('notification-wrapper', { 'notification-wrapper-no-content': !messages.length }) }
      >
        { messages.map((item) => (
          <ToastMessage
            { ...item }
            key={ item.id }
            clearMessages={ this.onClickMessage }
          />))
        }
      </div>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  notificationActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    notification: state.notificationReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    notificationActions: bindActionCreators(NotificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
