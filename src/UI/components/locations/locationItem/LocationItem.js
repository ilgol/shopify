import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './LocationItem.css';

export default class LocationItem extends Component {
  handleClick = () => {
    const { id, onClick } = this.props;

    onClick(id);
  };

  render() {
    const { name, ebox_location, active } = this.props;
    const { id, address } = ebox_location || {};

    return (
      <div
        className={ classNames('ebox-location-item', { 'm-active': active }) }
        onClick={ this.handleClick }
      >
        <div className='ebox-location-item-col'>
          <div className='ebox-location-item-name'>
            { `E.BoxStore #${id}` }
          </div>
          <div class="divider-left"></div>
          <div className='ebox-location-item-address'>
            { address }
          </div>
          <div class="divider-right"></div>
          <div className='ebox-location-item-custom-name'>
            { name }
          </div>
        </div>
      </div>
    );
  }
}

LocationItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string,
  onClick: PropTypes.func,
  ebox_location: PropTypes.object,
  active: PropTypes.bool,
};

LocationItem.defaultProps = {
  id: '',
  name: '',
  address: '',
  onClick() {
  },
};
