"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MONGOODB_URL = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var MONGOODB_URL = process.env.MONGOODB_URL;
exports.MONGOODB_URL = MONGOODB_URL;