'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('@shopify/polaris/styles.css');

var _polaris = require('@shopify/polaris');

var _App = require('./app/App');

var _App2 = _interopRequireDefault(_App);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _ShippingInfo = require('./shippingInfo/ShippingInfo');

var _ShippingInfo2 = _interopRequireDefault(_ShippingInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  _reactRouterDom.BrowserRouter,
  null,
  _react2.default.createElement(
    _polaris.AppProvider,
    null,
    _react2.default.createElement(
      _App2.default,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _ShippingInfo2.default })
    )
  )
), document.getElementById('e-box-container'));