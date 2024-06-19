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

// src/commonFunctions/convertExcelToJson.ts
var convertExcelToJson_exports = {};
__export(convertExcelToJson_exports, {
  convertExcelToJson: () => convertExcelToJson,
  convertExcelToJsonWithoutAlterLine: () => convertExcelToJsonWithoutAlterLine
});
module.exports = __toCommonJS(convertExcelToJson_exports);
var import_convert_excel_to_json = __toESM(require("convert-excel-to-json"), 1);
var convertExcelToJson = (listPath, line) => {
  try {
    const result = (0, import_convert_excel_to_json.default)(
      {
        sourceFile: listPath,
        sheets: [{
          name: "1",
          columnToKey: {
            A: "pm",
            B: "page",
            C: "it",
            D: "activity",
            E: "post",
            F: "sequence",
            G: "operations"
          }
        }]
      }
    );
    const jsonData = result["1"];
    const model = jsonData[0].pm;
    const product = jsonData[1].pm;
    jsonData[2].pm = line;
    const content = JSON.stringify(jsonData);
    return { model, product, content, line };
  } catch (error) {
    console.log({ message: "Error to convert excel to json", errorMessage: error });
  }
};
var convertExcelToJsonWithoutAlterLine = (listPath) => {
  try {
    const result = (0, import_convert_excel_to_json.default)(
      {
        sourceFile: listPath,
        sheets: [{
          name: "1",
          columnToKey: {
            A: "pm",
            B: "page",
            C: "it",
            D: "activity",
            E: "post",
            F: "sequence",
            G: "operations"
          }
        }]
      }
    );
    const jsonData = result["1"];
    const model = jsonData[0].pm;
    const product = jsonData[1].pm;
    const line = jsonData[2].pm;
    const content = JSON.stringify(jsonData);
    return { model, product, content, line };
  } catch (error) {
    console.log({ message: "Error to convert excel to json", errorMessage: error });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertExcelToJson,
  convertExcelToJsonWithoutAlterLine
});
