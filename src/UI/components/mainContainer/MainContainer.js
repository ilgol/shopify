import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class MainContainer extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

MainContainer.propTypes = {
  children: PropTypes.object,
};

export default withRouter(MainContainer);
