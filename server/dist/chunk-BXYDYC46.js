"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunk6T4COZLAjs = require('./chunk-6T4COZLA.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/models/quality.ts
var searchQAFiles;
var init_quality = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/models/quality.ts"() {
    _chunk6T4COZLAjs.init_db.call(void 0, );
    searchQAFiles = exports.searchQAFiles = (value) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "SELECT code, title, path FROM qa_files WHERE code LIKE ? OR title LIKE ?";
          await _chunk6T4COZLAjs.db.query(q, [`%${value}%`, `%${value}%`], (err, data) => {
            if (err) {
              reject(err);
            }
            if (data && data.length > 0) {
              resolve(data);
            } else {
              resolve([]);
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
  }
});




exports.searchQAFiles = searchQAFiles; exports.init_quality = init_quality;
//# sourceMappingURL=chunk-BXYDYC46.js.map