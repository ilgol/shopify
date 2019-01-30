import React from 'react';
import PropTypes from 'prop-types';
import './CustomButton.css';
import classNames from 'classnames';
import GenericSpinner from '../spinner/GenericSpinner';

const CustomButton = (props) => {
  const { icon, fontFamily, color, width, height, fontSize, fontWeight, disabled, clickHandler, className, text, spinnerBtn, tabIndex, onKeyDown, ...rest } = props;
  const buttonStyle = {
    width,
    height,
    fontWeight,
    color,
  };

  return (
    <div
      { ...rest }
      onClick={ !disabled ? clickHandler : null }
      className={ classNames('fl-buttonContainer', className) }
      style={ buttonStyle }
      tabIndex={ tabIndex }
      onKeyDown={ !disabled ? (onKeyDown ? onKeyDown : clickHandler) : null }
    >
      <div className={ classNames('fl-button', { 'fl-buttonDisabled': disabled }) }>
        <div
          className={ classNames('fl-buttonTextCenter', { 'fl-buttonDisabledOverlay': disabled, 'with-icon': icon }) }
          style={ { fontSize, fontFamily } }
        >
          { icon && <img className="button-icon" src={ icon } alt="icon" /> }
          { spinnerBtn &&
            <GenericSpinner
              borderWidth={ 4 }
              height={ 27 }
              width={ 27 }
            />
          }
          <div>{ !spinnerBtn && text }</div>
        </div>
      </div>
    </div>
  );
};

CustomButton.defaultProps = {
  fontFamily: '',
  fontSize: '18px',
  width: 190,
  height: 50,
  fontWeight: '300',
  icon: null,
  disabled: false,
  color: '#ffffff',
  tabIndex: '0',
};

CustomButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  clickHandler: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  spinnerBtn: PropTypes.bool,
  tabIndex: PropTypes.string,
  onKeyDown: PropTypes.func,
};

export default CustomButton;
