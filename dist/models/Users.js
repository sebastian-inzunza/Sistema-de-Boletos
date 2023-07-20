"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var schema = new _mongoose.Schema({
  name: {
    type: String
  },
  pass: {
    type: String
  }
}, {
  timestamps: true
});
var _default = (0, _mongoose.model)("Users", schema);
exports["default"] = _default;