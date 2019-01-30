import React from 'react';
import PropTypes from 'prop-types';
import './SpinnerBtn.css';
import classNames from 'classnames';

const SpinnerBtn = (props) => {
  const { isShow } = props;

  return (
    <div className={ classNames('spinner-btn-display-default', { 'spinner-btn-display': isShow }) }>
      <div className="lds-css ng-scope">
        <div className="lds-spin-btn" style={ { height: 'height:100%' } }>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

SpinnerBtn.propTypes = {
  isShow: PropTypes.bool.isRequired,
};

export default SpinnerBtn;
