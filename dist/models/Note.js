"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var schema = new _mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});
var _default = (0, _mongoose.model)("Note", schema);
exports["default"] = _default;