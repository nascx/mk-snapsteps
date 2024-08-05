"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkTUARQIGFjs = require('./chunk-TUARQIGF.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/models/auth.ts
var getPassword;
var init_auth = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/models/auth.ts"() {
    _chunkTUARQIGFjs.init_db.call(void 0, );
    getPassword = exports.getPassword = async (sector) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "SELECT password FROM users WHERE sector = ?";
          await _chunkTUARQIGFjs.db.query(q, [sector], (err, data) => {
            if (err) {
              reject(err);
            }
            if (data && data.length > 0) {
              resolve({ status: true, message: data[0].password });
            } else {
              resolve({ status: false, message: "Este setor n\xE3o existe!" });
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
  }
});




exports.getPassword = getPassword; exports.init_auth = init_auth;
//# sourceMappingURL=chunk-DG44POUG.js.map