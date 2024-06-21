"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPage = void 0;
const pdf_lib_1 = require("pdf-lib");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
// para pegar a página especifica da it
const getPage = async (it, pageNumber) => {
    try {
        const ITpath = node_path_1.default.resolve(__dirname, `../../_its/${it}.pdf`);
        const pdfBuffer = node_fs_1.default.readFileSync(ITpath);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBuffer);
        const newPdfDoc = await pdf_lib_1.PDFDocument.create();
        const [page] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]); // Copia a primeira página
        await newPdfDoc.addPage(page);
        const pdfBytes = await newPdfDoc.save();
        return pdfBytes;
    }
    catch (error) {
        throw error;
    }
};
exports.getPage = getPage;
