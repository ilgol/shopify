var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Avatar, Card, Page, ResourceList, TextStyle } from '@shopify/polaris';

var ShippingInfo = function (_Component) {
  _inherits(ShippingInfo, _Component);

  function ShippingInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShippingInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShippingInfo.__proto__ || Object.getPrototypeOf(ShippingInfo)).call.apply(_ref, [this].concat(args))), _this), _this.renderItem = function (item) {
      var id = item.id,
          url = item.url,
          name = item.name,
          location = item.location;

      var media = React.createElement(Avatar, { customer: true, size: 'medium', name: name });

      return React.createElement(
        ResourceList.Item,
        { id: id, url: url, media: media },
        React.createElement(
          'h3',
          null,
          React.createElement(
            TextStyle,
            { variation: 'strong' },
            name
          )
        ),
        React.createElement(
          'div',
          null,
          location
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShippingInfo, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        Page,
        null,
        React.createElement(
          Card,
          null,
          React.createElement(ResourceList, {
            showHeader: true,
            items: [{
              id: 341,
              url: 'customers/341',
              name: 'Mae Jemison',
              location: 'Decatur, USA'
            }, {
              id: 256,
              url: 'customers/256',
              name: 'Ellen Ochoa',
              location: 'Los Angeles, USA'
            }],
            renderItem: this.renderItem
          })
        )
      );
    }
  }]);

  return ShippingInfo;
}(Component);

export default ShippingInfo;