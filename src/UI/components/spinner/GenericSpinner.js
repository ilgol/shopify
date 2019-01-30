import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GenericSpinner.css';

class GenericSpinner extends Component {
  render() {
    const { borderWidth, borderStyle, borderRadius, borderColor, height, width, className } = this.props;

    return (
      <div>
        <div
          style={ {
            borderStyle,
            borderWidth,
            borderRadius,
            borderColor,
            height,
            width,
          } }
          className={ className }
        >
        </div>
      </div>
    );
  }
}

GenericSpinner.defaultProps = {
  borderStyle: 'solid',
  borderWidth: 10,
  borderRadius: 30,
  borderColor: '#ffffff',
  height: 50,
  width: 50,
  className: 'signal',
};

GenericSpinner.propTypes = {
  borderStyle: PropTypes.string,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  borderColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  className: PropTypes.string,
};

export default GenericSpinner;