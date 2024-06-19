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

// src/views/getPage.ts
var getPage_exports = {};
__export(getPage_exports, {
  getPage: () => getPage
});
module.exports = __toCommonJS(getPage_exports);
var import_pdf_lib = require("pdf-lib");
var import_node_path = __toESM(require("path"));
var import_node_fs = __toESM(require("fs"));
var getPage = async (it, pageNumber) => {
  try {
    const ITpath = import_node_path.default.resolve(__dirname, `../../_its/${it}.pdf`);
    const pdfBuffer = import_node_fs.default.readFileSync(ITpath);
    const pdfDoc = await import_pdf_lib.PDFDocument.load(pdfBuffer);
    const newPdfDoc = await import_pdf_lib.PDFDocument.create();
    const [page] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
    await newPdfDoc.addPage(page);
    const pdfBytes = await newPdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPage
});
