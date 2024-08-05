"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/views/getPage.ts
var _pdflib = require('pdf-lib');
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var getPage;
var init_getPage = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/views/getPage.ts"() {
    getPage = exports.getPage = async (it, pageNumber) => {
      try {
        const ITpath = _path2.default.resolve(__dirname, `../../_its/${it}.pdf`);
        const pdfBuffer = _fs2.default.readFileSync(ITpath);
        const pdfDoc = await _pdflib.PDFDocument.load(pdfBuffer);
        const newPdfDoc = await _pdflib.PDFDocument.create();
        const [page] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
        await newPdfDoc.addPage(page);
        const pdfBytes = await newPdfDoc.save();
        return pdfBytes;
      } catch (error) {
        throw error;
      }
    };
  }
});




exports.getPage = getPage; exports.init_getPage = init_getPage;
//# sourceMappingURL=chunk-GU6YLGOQ.js.map