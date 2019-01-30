import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignIn.css';
import LoginizationWrapper from '../components/loginizationWrapper/LoginizationWrapper';
import SignInForm from '../components/forms/signIn/SignIn';
import * as signInActions from './SignInActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SignIn extends Component {
  login = (email, password) => {
    this.props.signInActions.loginRequest(email, password);
  };

  render() {
    const { signIn } = this.props;

    return (
      <LoginizationWrapper>
        <SignInForm
          signIn={ signIn }
          signInActions={ signInActions }
          onSubmit={ this.login }
        />
      </LoginizationWrapper>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.object.isRequired,
  signInActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ...state,
    signIn: state.signInReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signInActions: bindActionCreators(signInActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);