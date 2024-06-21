"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCover = void 0;
const pdf_lib_1 = require("pdf-lib");
// para gerar capa por posto
const generateCover = async (post) => {
    // Cria um novo documento PDF
    const pdfDoc = await pdf_lib_1.PDFDocument.create();
    // Define o tamanho da página para paisagem (landscape)
    const page = pdfDoc.addPage([842, 595]); // A4 landscape size in points (width, height)
    // Carrega uma fonte
    const font = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.CourierBold);
    const fontSize = 80;
    // Obtém as dimensões da página
    const { width, height } = page.getSize();
    // Calcula a posição do texto centralizado
    const textWidth = font.widthOfTextAtSize(`Posto ${post}`, fontSize);
    const textHeight = fontSize;
    const x = (width - textWidth) / 2;
    const y = (height - textHeight) / 2;
    // Adiciona o texto à página
    page.drawText(`Grupo MK`, {
        x,
        y: 510,
        size: 60,
        font,
    });
    // Adiciona o texto à página
    page.drawText(`Posto ${post}`, {
        x,
        y,
        size: fontSize,
        font,
    });
    // Salva o documento PDF em um array de bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};
exports.generateCover = generateCover;
