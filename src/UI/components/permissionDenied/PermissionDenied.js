import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CustomButton from '../customButton/CustomButton';
import './PermissionDenied.css';

const PermissionDenied = ({ onClickChangeAccount }) => (
  <div className='permission-denied'>
    Oops! Looks like you have not right permission to access this page.
    <br />
    Please try to sign in to another account or go to home page.
    <div className='permission-denied-buttons'>
      <Link className='permission-denied-button permission-denied-button-link' to='/'>
        Home page
      </Link>
      <CustomButton
        width=''
        height=''
        className='permission-denied-button'
        text='Change Account'
        color=''
        clickHandler={ onClickChangeAccount }
      />
    </div>
  </div>
);

PermissionDenied.propTypes = {
  onClickChangeAccount: PropTypes.func,
};

PermissionDenied.defaultProps = {
  onClickChangeAccount: PropTypes.func,
};

export default PermissionDenied;