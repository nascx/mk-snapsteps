"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }


var _chunk7VNMNW4Xjs = require('./chunk-7VNMNW4X.js');



var _chunkABKZQFEXjs = require('./chunk-ABKZQFEX.js');



var _chunkGU6YLGOQjs = require('./chunk-GU6YLGOQ.js');



var _chunk7D2CMYFXjs = require('./chunk-7D2CMYFX.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/views/sendPDfByPost.ts
var _pdflib = require('pdf-lib');
var sendPdfByPost;
var init_sendPDfByPost = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/views/sendPDfByPost.ts"() {
    _chunk7D2CMYFXjs.init_production.call(void 0, );
    _chunk7VNMNW4Xjs.init_generateCover.call(void 0, );
    _chunkGU6YLGOQjs.init_getPage.call(void 0, );
    _chunkABKZQFEXjs.init_generateObs.call(void 0, );
    sendPdfByPost = exports.sendPdfByPost = async (req, res) => {
      try {
        const { model, product, line, post } = req.query;
        const content = await _chunk7D2CMYFXjs.exsitsThisListInProductionLists.call(void 0, model, product, line);
        if (content.status) {
          const jsonData = JSON.parse(content.content);
          const postsContent = {};
          const postsUseds = [post];
          jsonData.forEach((element, i) => {
            if (i > 0) {
              if (postsContent[element.post]) {
                postsContent[element.post].push({ it: element.it, page: element.page, operations: _nullishCoalesce(element.operations, () => ( "")) });
              } else {
                postsContent[element.post] = [{ it: element.it, page: element.page, operations: _nullishCoalesce(element.operations, () => ( "")) }];
              }
            }
          });
          const newPdfDoc = await _pdflib.PDFDocument.create();
          for (const post2 of postsUseds) {
            const pdfBytes = await _chunk7VNMNW4Xjs.generateCover.call(void 0, post2);
            const existingPdfDoc = await _pdflib.PDFDocument.load(pdfBytes);
            const [existingPage] = await newPdfDoc.copyPages(existingPdfDoc, [0]);
            newPdfDoc.addPage(existingPage);
            const pdf2 = postsContent[post2];
            for (const el of pdf2) {
              if (el.operations !== "") {
                const pdfBytesCover = await _chunkABKZQFEXjs.generateObs.call(void 0, el.operations);
                const existingPdfDoc3 = await _pdflib.PDFDocument.load(pdfBytesCover);
                const [existingPage3] = await newPdfDoc.copyPages(existingPdfDoc3, [0]);
                newPdfDoc.addPage(existingPage3);
              }
              const pdfBytes2 = await _chunkGU6YLGOQjs.getPage.call(void 0, el.it, el.page);
              const existingPdfDoc2 = await _pdflib.PDFDocument.load(pdfBytes2);
              const [existingPage2] = await newPdfDoc.copyPages(existingPdfDoc2, [0]);
              newPdfDoc.addPage(existingPage2);
            }
          }
          const pdf = await newPdfDoc.save();
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Content-Disposition", "inline; filename=extracted_page.pdf");
          res.send(Buffer.from(pdf));
        } else {
          res.status(404).send("Conte\xFAdo n\xE3o encontrado.");
        }
      } catch (error) {
        console.error("Erro ao processar o PDF:", error);
        res.status(500).send("Erro ao processar o PDF.");
      }
    };
  }
});




exports.sendPdfByPost = sendPdfByPost; exports.init_sendPDfByPost = init_sendPDfByPost;
//# sourceMappingURL=chunk-XD6GC3VN.js.map