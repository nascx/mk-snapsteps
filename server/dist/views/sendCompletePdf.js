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

// src/views/sendCompletePdf.ts
var sendCompletePdf_exports = {};
__export(sendCompletePdf_exports, {
  sendPdf: () => sendPdf
});
module.exports = __toCommonJS(sendCompletePdf_exports);
var import_pdf_lib4 = require("pdf-lib");

// src/config/db.ts
var import_mysql = __toESM(require("mysql"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var db = import_mysql.default.createConnection({
  host: process.env.DB_HOST || "10.12.100.14",
  user: process.env.DB_USER || "sysweb",
  database: process.env.DB_DATABASE || "snapsteps",
  password: process.env.DB_PASSWORD || "ZqkNUCy9DnPjGuSG"
});

// src/models/production.ts
var exsitsThisListInProductionLists = (model, product, line) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT content FROM production_lists WHERE model = ? AND product = ? AND line = ?";
      const values = [model, product, line];
      await db.query(q, values, (err, data) => {
        if (err) {
          console.log("Erro ao buscar por lista bna tabela de lista de produ\xE7\xE3o!");
          reject(err);
        }
        if (data && data.length > 0) {
          console.log("Existe listas na tabela de listas de engenharia que usam esse modelo e produto");
          resolve({ status: true, content: data[0].content });
        } else {
          resolve({ status: false, content: [] });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// src/views/generateCover.ts
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

// src/views/getPage.ts
var import_pdf_lib2 = require("pdf-lib");
var import_node_path = __toESM(require("path"));
var import_node_fs = __toESM(require("fs"));
var getPage = async (it, pageNumber) => {
  try {
    const ITpath = import_node_path.default.resolve(__dirname, `../../_its/${it}.pdf`);
    const pdfBuffer = import_node_fs.default.readFileSync(ITpath);
    const pdfDoc = await import_pdf_lib2.PDFDocument.load(pdfBuffer);
    const newPdfDoc = await import_pdf_lib2.PDFDocument.create();
    const [page] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
    await newPdfDoc.addPage(page);
    const pdfBytes = await newPdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw error;
  }
};

// src/views/generateObs.ts
var import_pdf_lib3 = require("pdf-lib");
var generateObs = async (operations) => {
  const pdfDoc = await import_pdf_lib3.PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const font = await pdfDoc.embedFont(import_pdf_lib3.StandardFonts.CourierBold);
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

// src/views/sendCompletePdf.ts
var sendPdf = async (req, res) => {
  try {
    const { model, product, line } = req.query;
    const content = await exsitsThisListInProductionLists(model, product, line);
    if (content.status) {
      const jsonData = JSON.parse(content.content);
      const postsContent = {};
      const postsUseds = [];
      jsonData.forEach((element, i) => {
        if (i > 0) {
          if (postsContent[element.post]) {
            postsContent[element.post].push({ it: element.it, page: element.page, operations: element.operations ?? "" });
          } else {
            postsContent[element.post] = [{ it: element.it, page: element.page, operations: element.operations ?? "" }];
            postsUseds.push(String(element.post));
          }
        }
      });
      const newPdfDoc = await import_pdf_lib4.PDFDocument.create();
      console.log(postsUseds);
      for (const post of postsUseds) {
        console.log(post);
        const pdfBytes = await generateCover(post);
        const existingPdfDoc = await import_pdf_lib4.PDFDocument.load(pdfBytes);
        const [existingPage] = await newPdfDoc.copyPages(existingPdfDoc, [0]);
        newPdfDoc.addPage(existingPage);
        const pdf2 = postsContent[post];
        console.log("Gerou posto", post);
        for (const el of pdf2) {
          console.log("pegando p\xE1gina");
          console.log(el.it, el.page);
          if (el.operations !== "") {
            const pdfBytesCover = await generateObs(el.operations);
            const existingPdfDoc3 = await import_pdf_lib4.PDFDocument.load(pdfBytesCover);
            const [existingPage3] = await newPdfDoc.copyPages(existingPdfDoc3, [0]);
            newPdfDoc.addPage(existingPage3);
          }
          const pdfBytes2 = await getPage(el.it, el.page);
          const existingPdfDoc2 = await import_pdf_lib4.PDFDocument.load(pdfBytes2);
          const [existingPage2] = await newPdfDoc.copyPages(existingPdfDoc2, [0]);
          newPdfDoc.addPage(existingPage2);
          console.log("p\xE1gina gerada", el.page, el.it);
        }
      }
      const pdf = await newPdfDoc.save();
      console.log("finalizou");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendPdf
});
