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

// src/controllers/qaCtrl.ts
var qaCtrl_exports = {};
__export(qaCtrl_exports, {
  sendQAFilesOptions: () => sendQAFilesOptions
});
module.exports = __toCommonJS(qaCtrl_exports);

// src/config/db.ts
var import_mysql = __toESM(require("mysql"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var db = import_mysql.default.createConnection({
  host: process.env.DB_HOST || "10.12.100.14",
  user: process.env.DB_USER || "sysweb",
  database: process.env.DB_DATABASE || "snapsteps",
  password: process.env.DB_PASSWORD || "ZqkNUCy9DnPjGuSG"
});

// src/models/quality.ts
var searchQAFiles = (value) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT code, title, path FROM qa_files WHERE code LIKE ? OR title LIKE ?";
      await db.query(q, [`%${value}%`, `%${value}%`], (err, data) => {
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

// src/controllers/qaCtrl.ts
var sendQAFilesOptions = async (req, res) => {
  try {
    const { value } = req.query;
    console.log(value);
    const data = await searchQAFiles(value);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendQAFilesOptions
});
