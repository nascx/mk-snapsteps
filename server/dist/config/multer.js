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

// src/config/multer.ts
var multer_exports = {};
__export(multer_exports, {
  uploadEngineeringLists: () => uploadEngineeringLists,
  uploadIT: () => uploadIT,
  uploadProductionListsMulter: () => uploadProductionListsMulter,
  uploadQuality: () => uploadQuality
});
module.exports = __toCommonJS(multer_exports);
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var storageEngineeringList = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    const filePath = import_path.default.join(__dirname, "../../00_engineering_lists");
    console.log("Fun\xE7\xE3o chamada!");
    callback(null, filePath);
  },
  filename: function(req, file, callback) {
    const fileName = file.originalname;
    callback(null, `${fileName}`);
  }
});
var uploadEngineeringLists = (0, import_multer.default)({ storage: storageEngineeringList });
var storageProductionList = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    const filePath = import_path.default.join(__dirname, "../../00_production_lists");
    console.log("Chamado no multer: ", filePath);
    callback(null, filePath);
  },
  filename: function(req, file, callback) {
    const fileName = file.originalname;
    callback(null, `${fileName}`);
  }
});
var uploadProductionListsMulter = (0, import_multer.default)({ storage: storageProductionList });
var storageIT = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    const filePath = import_path.default.join(__dirname, "../../_its");
    callback(null, filePath);
  },
  filename: function(req, file, callback) {
    const fileName = file.originalname;
    callback(null, `${fileName}`);
  }
});
var uploadIT = (0, import_multer.default)({ storage: storageIT });
var storageQuality = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    const filePath = import_path.default.join(__dirname, "../../_quality");
    callback(null, filePath);
  },
  filename: function(req, file, callback) {
    const fileName = file.originalname;
    callback(null, `${fileName}`);
  }
});
var uploadQuality = (0, import_multer.default)({ storage: storageQuality });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uploadEngineeringLists,
  uploadIT,
  uploadProductionListsMulter,
  uploadQuality
});
