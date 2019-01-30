import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ShippingItem.css';

export default class ShippingItem extends Component {
  handleClick = () => {
    const { code, onClick } = this.props;

    onClick(code);
  };

  render() {
    const { name, active, price } = this.props;

    return (
      <div
        className={ classNames('shipping-item', { 'm-active': active }) }
        onClick={ this.handleClick }
      >
        <div className='shipping-item-col'>
          <div className='shipping-item-name'>
            { name }
          </div>
          <div class="divider-left"></div>
          <div className='shipping-item-price'>
            { `$${ price }` }
          </div>
        </div>
      </div>
    );
  }
}

ShippingItem.propTypes = {
  code: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
  name: PropTypes.string,
  price: PropTypes.string,
  active: PropTypes.bool,
};

ShippingItem.defaultProps = {
  code: '',
  active: false,
  onClick() {
  },
  name: '',
  price: '',
};
