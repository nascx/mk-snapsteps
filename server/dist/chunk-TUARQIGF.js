"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/config/db.ts
var _mysql = require('mysql'); var _mysql2 = _interopRequireDefault(_mysql);
var _dotenv = require('dotenv');
var db;
var init_db = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/config/db.ts"() {
    _dotenv.config.call(void 0, );
    db = exports.db = _mysql2.default.createConnection({
      host: process.env.DB_HOST || "10.12.100.14",
      user: process.env.DB_USER || "sysweb",
      database: process.env.DB_DATABASE || "snapsteps",
      password: process.env.DB_PASSWORD || "ZqkNUCy9DnPjGuSG"
    });
  }
});




exports.db = db; exports.init_db = init_db;
//# sourceMappingURL=chunk-TUARQIGF.js.map