"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunk6T4COZLAjs = require('./chunk-6T4COZLA.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/models/auth.ts
var getPassword;
var init_auth = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/models/auth.ts"() {
    _chunk6T4COZLAjs.init_db.call(void 0, );
    getPassword = exports.getPassword = async (sector) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "SELECT password FROM users WHERE sector = ?";
          await _chunk6T4COZLAjs.db.query(q, [sector], (err, data) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            if (data && data.length > 0) {
              console.log(data[0]);
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
//# sourceMappingURL=chunk-WFX26W6B.js.map