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

// src/models/auth.ts
var auth_exports = {};
__export(auth_exports, {
  getPassword: () => getPassword
});
module.exports = __toCommonJS(auth_exports);

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

// src/models/auth.ts
var getPassword = async (sector) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT password FROM users WHERE sector = ?";
      await db.query(q, [sector], (err, data) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPassword
});
