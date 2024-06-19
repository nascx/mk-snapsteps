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

// src/views/generateCover.ts
var generateCover_exports = {};
__export(generateCover_exports, {
  generateCover: () => generateCover
});
module.exports = __toCommonJS(generateCover_exports);
var import_pdf_lib = require("pdf-lib");
var generateCover = async (post) => {
  const pdfDoc = await import_pdf_lib.PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const font = await pdfDoc.embedFont(import_pdf_lib.StandardFonts.CourierBold);
  const fontSize = 80;
  const { width, height } = page.getSize();
  const textWidth = font.widthOfTextAtSize(`Posto ${post}`, fontSize);
  const textHeight = fontSize;
  const x = (width - textWidth) / 2;
  const y = (height - textHeight) / 2;
  page.drawText(`Grupo MK`, {
    x,
    y: 510,
    size: 60,
    font
  });
  page.drawText(`Posto ${post}`, {
    x,
    y,
    size: fontSize,
    font
  });
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateCover
});
