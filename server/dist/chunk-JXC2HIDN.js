"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunk6T4COZLAjs = require('./chunk-6T4COZLA.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/models/sgi.ts
var existsThisIT, insertIT, existsThisQAFile, insertQAFile;
var init_sgi = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/models/sgi.ts"() {
    _chunk6T4COZLAjs.init_db.call(void 0, );
    existsThisIT = exports.existsThisIT = (path) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "SELECT name FROM its WHERE path = ?";
          await _chunk6T4COZLAjs.db.query(q, [path], (err, data) => {
            if (err) {
              reject(err);
            }
            if (data && data.length > 0) {
              resolve({ status: true });
            } else {
              resolve({ status: false });
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    insertIT = exports.insertIT = (path, name) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "INSERT INTO its (path, name) VALUES (?, ?)";
          await _chunk6T4COZLAjs.db.query(q, [path, name], (err, data) => {
            if (err) {
              reject(err);
            }
            if (data.affectedRows > 0) {
              console.log("Arquivos inserido com sucesso na tabela its", data);
              resolve(true);
            } else {
              console.log("Por algum motivo os dados n\xE3o foram inseridos na tabela de its!");
              reject("Nenhum dado inserido na tabela de its!");
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    existsThisQAFile = exports.existsThisQAFile = (code) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "SELECT title FROM qa_files WHERE code = ?";
          await _chunk6T4COZLAjs.db.query(q, [code], (err, data) => {
            if (err) {
              reject(err);
            }
            if (data && data.length > 0) {
              resolve({ status: true });
            } else {
              resolve({ status: false });
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    insertQAFile = exports.insertQAFile = (code, title, path) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "INSERT INTO qa_files (code, title, path) VALUES (?, ?, ?)";
          await _chunk6T4COZLAjs.db.query(q, [code, title, path], (err, data) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            if (data.affectedRows > 0) {
              console.log("Arquivos inserido com sucesso na tabela arquivos do qa", data);
              resolve(true);
            } else {
              console.log("Por algum motivo os dados n\xE3o foram inseridos na tabela de arquivos do qa!");
              reject("Nenhum dado inserido na tabela de its!");
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
  }
});







exports.existsThisIT = existsThisIT; exports.insertIT = insertIT; exports.existsThisQAFile = existsThisQAFile; exports.insertQAFile = insertQAFile; exports.init_sgi = init_sgi;
//# sourceMappingURL=chunk-JXC2HIDN.js.map