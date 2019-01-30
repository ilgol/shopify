import React, { Component } from 'react';
import './AvaliableLocations.css';
import Locations from '../components/locations/Locations';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { canPerformAction } from '../services/Helper';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as signInActions from '../signIn/SignInActions';
import logout from '../images/logout.svg';

class AvaliableLocations extends Component {
  handleLogout = (e) => {
    const { signInActions, history } = this.props;

    if(canPerformAction(e)) {
      signInActions.logout();
      history.push('/');
    }
  };

  render() {
    return (
      <div className='locations-details'>
        <div className='locations-details-block'>
          <div className='template-header-container'>
            <p className='locations-details-p'>AVALIABLE LOCATIONS</p>
            <img onClick={ this.handleLogout } onKeyDown={ this.handleLogout } tabIndex='0' title='Logout' alt='Logout' src={ logout } />
          </div>
          <Locations />
        </div>
      </div>
    );
  }
}

AvaliableLocations.propTypes = {
  history: PropTypes.object.isRequired,
  signInActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signInActions: bindActionCreators(signInActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AvaliableLocations));