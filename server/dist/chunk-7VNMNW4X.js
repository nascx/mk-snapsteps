"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/views/generateCover.ts
var _pdflib = require('pdf-lib');
var generateCover;
var init_generateCover = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/views/generateCover.ts"() {
    generateCover = exports.generateCover = async (post) => {
      const pdfDoc = await _pdflib.PDFDocument.create();
      const page = pdfDoc.addPage([842, 595]);
      const font = await pdfDoc.embedFont(_pdflib.StandardFonts.CourierBold);
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
  }
});




exports.generateCover = generateCover; exports.init_generateCover = init_generateCover;
//# sourceMappingURL=chunk-7VNMNW4X.js.map