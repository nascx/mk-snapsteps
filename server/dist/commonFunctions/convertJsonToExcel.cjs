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

// src/commonFunctions/convertJsonToExcel.ts
var convertJsonToExcel_exports = {};
__export(convertJsonToExcel_exports, {
  convertJsonToExcel: () => convertJsonToExcel
});
module.exports = __toCommonJS(convertJsonToExcel_exports);
var import_exceljs = __toESM(require("exceljs"), 1);
var convertJsonToExcel = (jsonData) => {
  const workbook = new import_exceljs.default.Workbook();
  const worksheet = workbook.addWorksheet("1");
  worksheet.getColumn("A").width = 20;
  worksheet.getColumn("B").width = 20;
  worksheet.getColumn("C").width = 20;
  worksheet.getColumn("D").width = 60;
  worksheet.getColumn("E").width = 20;
  worksheet.getColumn("F").width = 20;
  worksheet.getColumn("G").width = 20;
  jsonData.forEach((row) => {
    const rowData = [row.pm, row.page, row.it, row.activity, row.post, row.sequence, row.operations];
    worksheet.addRow(rowData);
  });
  worksheet.getCell("B1").font = { bold: true };
  worksheet.getCell("C1").font = { bold: true };
  worksheet.getCell("D1").font = { bold: true };
  worksheet.getCell("E1").font = { bold: true };
  worksheet.getCell("F1").font = { bold: true };
  worksheet.getCell("G1").font = { bold: true };
  return workbook;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertJsonToExcel
});
