"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/views/generateObs.ts
var generateObs_exports = {};
__export(generateObs_exports, {
  generateObs: () => generateObs
});
module.exports = __toCommonJS(generateObs_exports);
var import_pdf_lib = require("pdf-lib");
var generateObs = async (operations) => {
  const pdfDoc = await import_pdf_lib.PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const font = await pdfDoc.embedFont(import_pdf_lib.StandardFonts.CourierBold);
  const fontSize = 35;
  const { width, height } = page.getSize();
  const textHeight = fontSize;
  page.drawText(`Na p\xE1gina abaixo vide:`, {
    x: 200,
    y: 400,
    size: fontSize,
    font
  });
  page.drawText(`Opera\xE7\xF5es: ${operations}`, {
    x: 842 / 6,
    y: 595 / 2,
    size: fontSize,
    font
  });
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateObs
});
