import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './SpinnerGrid.css';

const SpinnerGrid = ({ className, isShow }) => {
  if(!isShow)
    return null;

  return (
    <div className={ classNames('main-spinner', className) }>
      <div className="main-spinner__block">
        <div className="main-spinner__item" />
        <div className="main-spinner__item main-spinner--delay" />
        <div className="main-spinner__item main-spinner--delay" />
        <div className="main-spinner__item" />
      </div>
    </div>
  );
};

SpinnerGrid.propTypes = {
  className: PropTypes.string,
  isShow: PropTypes.bool.isRequired,
};

SpinnerGrid.defaultProps = {
  className: '',
};

export default SpinnerGrid;
