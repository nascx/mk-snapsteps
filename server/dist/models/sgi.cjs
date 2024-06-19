"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/models/sgi.ts
var sgi_exports = {};
__export(sgi_exports, {
  existsThisIT: () => existsThisIT,
  existsThisQAFile: () => existsThisQAFile,
  insertIT: () => insertIT,
  insertQAFile: () => insertQAFile
});
module.exports = __toCommonJS(sgi_exports);

// src/config/db.ts
var import_mysql = __toESM(require("mysql"), 1);
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var db = import_mysql.default.createConnection({
  host: process.env.DB_HOST || "10.12.100.14",
  user: process.env.DB_USER || "sysweb",
  database: process.env.DB_DATABASE || "snapsteps",
  password: process.env.DB_PASSWORD || "ZqkNUCy9DnPjGuSG"
});

// src/models/sgi.ts
var existsThisIT = (path) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT name FROM its WHERE path = ?";
      await db.query(q, [path], (err, data) => {
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
var insertIT = (path, name) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "INSERT INTO its (path, name) VALUES (?, ?)";
      await db.query(q, [path, name], (err, data) => {
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
var existsThisQAFile = (code) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT title FROM qa_files WHERE code = ?";
      await db.query(q, [code], (err, data) => {
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
var insertQAFile = (code, title, path) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "INSERT INTO qa_files (code, title, path) VALUES (?, ?, ?)";
      await db.query(q, [code, title, path], (err, data) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  existsThisIT,
  existsThisQAFile,
  insertIT,
  insertQAFile
});
