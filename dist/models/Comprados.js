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
  estado: {
    type: String
  },
  fechaHora: {
    type: String
  }
}, {
  timestamps: true
});
var _default = (0, _mongoose.model)("Comprados", schema);
exports["default"] = _default;