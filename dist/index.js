import React from 'react';
import '@shopify/polaris/styles.css';
import { AppProvider } from '@shopify/polaris';
import App from './app/App';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShippingInfo from './shippingInfo/ShippingInfo';

ReactDOM.render(React.createElement(
  Router,
  null,
  React.createElement(
    AppProvider,
    null,
    React.createElement(
      App,
      null,
      React.createElement(Route, { exact: true, path: '/', component: ShippingInfo })
    )
  )
), document.getElementById('e-box-container'));