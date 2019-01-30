import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import InputElement from 'react-input-mask';
import classNames from 'classnames';
import _pick from 'lodash/pick';
import ReactTooltip from 'react-tooltip';
import defaultIcon from '../../images/box-blue.svg';
import errorIcon from '../../images/errorstext.svg';
import './InputComponent.css';
import bowser from 'bowser';

const PICK_PROPS = [
  'placeholder',
  'disabled',
  'readOnly',
  'onBlur',
  'onKeyDown',
  'onChange',
  'onClick',
  'defaultValue',
  'value',
  'name',
  'maxLength',
];

const InputComponent = (props) => {
  const {
    classWrapperDiv,
    className,
    classNameIcon,
    type,
    multiLine,
    width,
    placeholder,
    showHintOnHoverIcon,
    iconSrc,
    error,
    mask,
    onClickIcon,
    hover,
    autoComplete,
    tabIndex,
    onKeyDown,
    onFocus,
  } = props;
  const generalProps = _pick(props, PICK_PROPS);

  generalProps.style = {
    width,
  };

  return (
    <div className={ classNames('wrap-input-field', classWrapperDiv, { 'm-multiline': multiLine }) }>
      { iconSrc &&
      <img
        className={ classNames('icon-for-input', { 'ie-icon': bowser.msie }, classNameIcon) }
        src={ iconSrc }
        data-tip={ showHintOnHoverIcon ? placeholder : null }
        onClick={ onClickIcon }
      />
      }
      { showHintOnHoverIcon &&
        ReactDOM.createPortal(
          <ReactTooltip place='left' />,
          document.querySelector('body'),
        )
      }
      { multiLine &&
      <textarea
        { ...generalProps }
        className={ classNames('input-field input-field-textarea', className) }
      />
      }
      { !multiLine &&
      <div
        className="input-container"
        title={ hover }
      >
        <InputElement
          { ...generalProps }
          className={ classNames('input-field', { 'ie-input': bowser.msie }, className) }
          type={ type }
          mask={ mask }
          autoComplete={ autoComplete }
          tabIndex={ tabIndex }
          onKeyDown={ onKeyDown }
          onFocus={ onFocus }
        />
      </div>
      }
      { error && <img src={ errorIcon } className="error-for-input" alt="Input error icon" /> }
    </div>
  );
};

InputComponent.defaultProps = {
  classWrapperDiv: '',
  className: '',
  classNameIcon: '',
  type: 'text',
  placeholder: 'Input',
  disabled: false,
  readOnly: false,
  multiLine: false,
  showHintOnHoverIcon: false,
  width: '',
  name: '',
  maxLength: 256,
  iconSrc: defaultIcon,
  onClickIcon() {
  },
  onChange() {
  },
  autoComplete: 'off',
  title: '',
  tabIndex: '0',
};

InputComponent.propTypes = {
  classWrapperDiv: PropTypes.string,
  className: PropTypes.string,
  classNameIcon: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  multiLine: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  showHintOnHoverIcon: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  error: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onClickIcon: PropTypes.func,
  name: PropTypes.string,
  iconSrc: PropTypes.string,
  mask: PropTypes.string,
  defaultValue: PropTypes.string,
  maxLength: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  hover: PropTypes.string,
  autoComplete: PropTypes.string,
  tabIndex: PropTypes.string,
  onKeyDown: PropTypes.func,
};

export default InputComponent;
