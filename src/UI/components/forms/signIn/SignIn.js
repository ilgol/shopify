import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputComponent from '../../inputComponent/InputComponent';
import './SignIn.css';
import { Field, reduxForm } from 'redux-form';
import CustomButton from '../../customButton/CustomButton';
import email from '../../../images/email.svg';
import password from '../../../images/password.svg';
import { signInValidate } from '../../../services/FormValidate';
import classNames from 'classnames';
import { canPerformAction } from '../../../services/Helper';
import { APP_URL } from '../../../services/Constants';

class SignIn extends Component {
  onSubmit = ({ email, password }) => {
    this.props.onSubmit(email, password);
  };

  handleKeyDown = (e) => {
    const { invalid, handleSubmit } = this.props;

    if(!invalid && canPerformAction(e))
      handleSubmit(this.onSubmit)();
  };

  renderField = ({ icon, label, meta: { error, touched, invalid }, input: { onChange, value, name, onBlur, onFocus } }) => {
    const checkType = name === 'password';

    return (
      <div className={ classNames('form-group', { 'has-error ': invalid && error && touched }) }>
        <InputComponent
          iconSrc={ icon }
          placeholder={ label }
          onChange={ onChange }
          value={ name === 'email' ? value.trim() : value }
          onBlur={ onBlur }
          onFocus={ onFocus }
          error={ error && touched }
          onKeyDown={ this.handleKeyDown }
          type={ checkType ? 'password' : 'text' }
        />
        { invalid && error && touched
          ? (
            <div className='error-message-container'>
              <div className="error-message">{ error }</div>
            </div>
          )
          : (
            <div className="helpBlock" />
          )
        }
      </div>
    );
  };

  render() {
    const { handleSubmit, signIn } = this.props;

    return (
      <div className='sign-in-form-wrapper'>
        <form className="loginForm" onSubmit={ handleSubmit(this.onSubmit) }>
          <Field
            icon={ email }
            name="email"
            type="email"
            component={ this.renderField }
            label="Enter Email"
          />
          <Field
            icon={ password }
            name="password"
            type="password"
            component={ this.renderField }
            label="Enter Password"
          />
          <div className="sign-in-links">
            <div className="signUp-link">
              No Account yet? <a target="_blank" href={ `${ APP_URL }/#/sign-up` }>Create one!</a>
            </div>
          </div>
          <CustomButton
            text={ signIn.loading ? '' : 'Sign In' }
            clickHandler={ handleSubmit(this.onSubmit) }
            className="submit"
            fontFamily="RobotoRegular"
            width={ 400 }
            height={ 50 }
            spinnerBtn={ signIn.loading }
            onKeyDown={ this.handleKeyDown }
          />
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  signIn: PropTypes.object,
  invalid: PropTypes.bool,
};

SignIn = reduxForm({
  form: 'SignIn',
  validate: signInValidate,
})(SignIn);

export default SignIn;