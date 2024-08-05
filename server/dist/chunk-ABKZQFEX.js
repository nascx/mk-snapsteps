"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/views/generateObs.ts
var _pdflib = require('pdf-lib');
var generateObs;
var init_generateObs = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/views/generateObs.ts"() {
    generateObs = exports.generateObs = async (operations) => {
      const pdfDoc = await _pdflib.PDFDocument.create();
      const page = pdfDoc.addPage([842, 595]);
      const font = await pdfDoc.embedFont(_pdflib.StandardFonts.CourierBold);
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
  }
});




exports.generateObs = generateObs; exports.init_generateObs = init_generateObs;
//# sourceMappingURL=chunk-ABKZQFEX.js.map