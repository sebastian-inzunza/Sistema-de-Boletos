"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var schema = new _mongoose.Schema({
  numero: {
    type: Number
  },
  activo: {
    type: Boolean
  }
}, {
  timestamps: true
});
var _default = (0, _mongoose.model)("Boletos", schema);
exports["default"] = _default;