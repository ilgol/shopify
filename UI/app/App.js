import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { register, unregister } from '../services/createServiceWorker';

class App extends Component {
  componentDidMount() {
    register();
  }

  componentWillUnmount() {
    unregister();
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;