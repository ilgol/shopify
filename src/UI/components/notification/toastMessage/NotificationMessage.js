import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import closeIcon from '../../../images/close.svg';
import iconSuccess from '../../../images/green.svg';
import iconError from '../../../images/rad.svg';
import iconWarning from '../../../images/yellow.svg';
import './NotificationMessage.css';
import { Link } from 'react-router-dom';

class NotificationMessage extends Component {
  componentDidMount() {
    const { timeout, isNeedRedirect } = this.props;

    if(!isNeedRedirect)
      this.autoHideTimeout = setTimeout(this.closeMessage, timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.autoHideTimeout);
  }

  closeMessage = () => {
    const { id, clearMessages } = this.props;

    clearMessages(id);
  };

  render() {
    const { error, warning, message, isNeedRedirect } = this.props;
    const toastClassName = classNames(
      'notification-message-container notification-show',
      {
        'notification-success': !error,
        'notification-error': error,
        'notification-warning': !error && warning,

      }
    );
    const notificationIconClassName = classNames(
      'notification-icon-container',
      {
        'success-icon': !error,
        'error-icon': error,
        'warning-icon': !error && warning,
      }
    );

    return (
      <div className={ toastClassName }>
        <div className={ notificationIconClassName }>
          <img
            alt="Notification"
            src={ error ? iconError : !error && warning ? iconWarning : iconSuccess }
          />
        </div>
        { isNeedRedirect
          ? (
            <Link to='/notifications' onClick={ this.closeMessage } className='message-text'>{ message }</Link>
          )
          : (
            <div className='message-text'>
              { message }
            </div>
          )
        }
        { !isNeedRedirect &&
          <div className="notification-close-container">
            <img alt="Close" src={ closeIcon } onClick={ this.closeMessage } />
          </div>
        }
      </div>
    );
  }
}

NotificationMessage.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  timeout: PropTypes.number,
  clearMessages: PropTypes.func,
  isNeedRedirect: PropTypes.bool,
};

NotificationMessage.defaultProps = {
  timeout: 4000,
  isNeedRedirect: false,
};

export default NotificationMessage;
