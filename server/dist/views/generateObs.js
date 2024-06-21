"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateObs = void 0;
const pdf_lib_1 = require("pdf-lib");
// para gerar capa por posto
const generateObs = async (operations) => {
    // Cria um novo documento PDF
    const pdfDoc = await pdf_lib_1.PDFDocument.create();
    // Define o tamanho da página para paisagem (landscape)
    const page = pdfDoc.addPage([842, 595]); // A4 landscape size in points (width, height)
    // Carrega uma fonte
    const font = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.CourierBold);
    const fontSize = 35;
    // Obtém as dimensões da página
    const { width, height } = page.getSize();
    const textHeight = fontSize;
    page.drawText(`Na página abaixo vide:`, {
        x: 200,
        y: 400,
        size: fontSize,
        font,
    });
    // Adiciona o texto à página
    page.drawText(`Operações: ${operations}`, {
        x: 842 / 6,
        y: 595 / 2,
        size: fontSize,
        font,
    });
    // Salva o documento PDF em um array de bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};
exports.generateObs = generateObs;
