import React from 'react';
import '@shopify/polaris/styles.css';
import { AppProvider } from '@shopify/polaris';
import App from './app/App';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShippingInfo from './shippingInfo/ShippingInfo';

ReactDOM.render(
  <Router>
    <AppProvider>
      <App>
        <Route exact path='/' component={ ShippingInfo } />
      </App>
    </AppProvider>
  </Router>,
  document.getElementById('e-box-container')
);