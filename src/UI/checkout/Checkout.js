import React, { Component } from 'react';
import './Checkout.css';
import Shippings from '../components/shippings/shippings';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { canPerformAction } from '../services/Helper';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as signInActions from '../signIn/SignInActions';
import logout from '../images/logout.svg';

class Checkout extends Component {
  handleLogout = (e) => {
    const { signInActions, history } = this.props;

    if(canPerformAction(e)) {
      signInActions.logout();
      history.push('/');
    }
  };

  componentDidUpdate() {
    const { checkoutReducer } = this.props;
    const { checkoutUrl } = checkoutReducer;

    checkoutUrl && (window.location.href = checkoutUrl);
  }

  render() {
    return (
      <div className='shipping-details'>
        <div className='shipping-details-block'>
          <div className='template-header-container'>
            <p className='shipping-details-p'>AVAILABLE SHIPPING METHODS</p>
            <img onClick={ this.handleLogout } onKeyDown={ this.handleLogout } tabIndex='0' title='Logout' alt='Logout' src={ logout } />
          </div>
          <Shippings />
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object.isRequired,
  signInActions: PropTypes.object.isRequired,
  checkoutReducer: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    shippingsReducer: state.shippingsReducer,
    checkoutReducer: state.checkoutReducer,
    locationsReducer: state.locationsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signInActions: bindActionCreators(signInActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));