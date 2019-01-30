import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LoginizationWrapper.css';
import Notification from '../../components/notification/Notification';
import eBoxSecureLogo from '../../images/eBoxSecureLogo.png';

class LoginizationWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      token: '',
      resetModalOpen: false,
    };
  }

  render() {
    const { children } = this.props;

    return (
      <div className="loginization-wrapper-container">
        <Notification />
        <div className="loginization-container">
          <div className="form-loginization-container">
            <img className="form-loginization-logo" src={ eBoxSecureLogo } alt='eBoxSecureLogo' />
            <div className="form-loginization-content">
              { children }
            </div>
          </div>
        </div>
        <div className="loginization-footer">&copy;{ (new Date().getFullYear()) } E BOXSECURE</div>
      </div>
    );
  }
}

LoginizationWrapper.propTypes = {
  children: PropTypes.element,
};

export default LoginizationWrapper;