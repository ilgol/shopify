'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _polaris = require('@shopify/polaris');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShippingInfo = function (_Component) {
  (0, _inherits3.default)(ShippingInfo, _Component);

  function ShippingInfo() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ShippingInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ShippingInfo.__proto__ || Object.getPrototypeOf(ShippingInfo)).call.apply(_ref, [this].concat(args))), _this), _this.renderItem = function (item) {
      var id = item.id,
          url = item.url,
          name = item.name,
          location = item.location;

      var media = _react2.default.createElement(_polaris.Avatar, { customer: true, size: 'medium', name: name });

      return _react2.default.createElement(
        _polaris.ResourceList.Item,
        { id: id, url: url, media: media },
        _react2.default.createElement(
          'h3',
          null,
          _react2.default.createElement(
            _polaris.TextStyle,
            { variation: 'strong' },
            name
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          location
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ShippingInfo, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _polaris.Page,
        null,
        _react2.default.createElement(
          _polaris.Card,
          null,
          _react2.default.createElement(_polaris.ResourceList, {
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
}(_react.Component);

exports.default = ShippingInfo;