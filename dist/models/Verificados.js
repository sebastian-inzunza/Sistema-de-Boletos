"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var schema = new _mongoose.Schema({
  telefono: {
    type: String
  },
  nombre: {
    type: String
  },
  folio: {
    type: String
  },
  boletos: {
    type: [{}]
  },
  fechaHora: {
    type: String
  },
  fechaComprado: {
    type: String
  },
  estado: {
    type: String
  }
}, {
  timestamps: true
});
var _default = (0, _mongoose.model)("Verificados", schema);
exports["default"] = _default;