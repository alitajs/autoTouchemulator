"use strict";

var _f2Touchemulator = _interopRequireDefault(require("f2-touchemulator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var target = document.getElementsByClassName('__dumi-default-mobile-demo-layout');

if (target && target[0]) {
  (0, _f2Touchemulator.default)(target[0]);
} else {
  (0, _f2Touchemulator.default)(window);
}