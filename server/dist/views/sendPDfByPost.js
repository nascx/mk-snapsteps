"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPdfByPost = void 0;
const pdf_lib_1 = require("pdf-lib");
const production_1 = require("../models/production");
const generateCover_1 = require("./generateCover");
const getPage_1 = require("./getPage");
const generateObs_1 = require("./generateObs");
const sendPdfByPost = async (req, res) => {
    try {
        const { model, product, line, post } = req.query;
        const content = await (0, production_1.exsitsThisListInProductionLists)(model, product, line);
        if (content.status) {
            const jsonData = JSON.parse(content.content);
            const postsContent = {};
            const postsUseds = [post];
            jsonData.forEach((element, i) => {
                if (i > 0) {
                    if (postsContent[element.post]) {
                        postsContent[element.post].push({ it: element.it, page: element.page, operations: element.operations ?? '' });
                    }
                    else {
                        postsContent[element.post] = [{ it: element.it, page: element.page, operations: element.operations ?? '' }];
                    }
                }
            });
            const newPdfDoc = await pdf_lib_1.PDFDocument.create();
            for (const post of postsUseds) {
                // Gera os bytes do PDF
                const pdfBytes = await (0, generateCover_1.generateCover)(post);
                // Carrega os bytes do PDF gerado
                const existingPdfDoc = await pdf_lib_1.PDFDocument.load(pdfBytes);
                // Copia todas as páginas do PDF existente para o novo PDF
                const [existingPage] = await newPdfDoc.copyPages(existingPdfDoc, [0]);
                // Adiciona a página copiada ao novo PDF
                newPdfDoc.addPage(existingPage);
                const pdf = postsContent[post];
                for (const el of pdf) {
                    if (el.operations !== '') {
                        const pdfBytesCover = await (0, generateObs_1.generateObs)(el.operations);
                        // Carrega os bytes do PDF gerado
                        const existingPdfDoc = await pdf_lib_1.PDFDocument.load(pdfBytesCover);
                        // Copia todas as páginas do PDF existente para o novo PDF
                        const [existingPage] = await newPdfDoc.copyPages(existingPdfDoc, [0]);
                        // Adiciona a página copiada ao novo PDF
                        newPdfDoc.addPage(existingPage);
                    }
                    const pdfBytes = await (0, getPage_1.getPage)(el.it, el.page);
                    // Carrega os bytes do PDF gerado
                    const existingPdfDoc = await pdf_lib_1.PDFDocument.load(pdfBytes);
                    // Copia todas as páginas do PDF existente para o novo PDF
                    const [existingPage] = await newPdfDoc.copyPages(existingPdfDoc, [0]);
                    // Adiciona a página copiada ao novo PDF
                    newPdfDoc.addPage(existingPage);
                }
            }
            const pdf = await newPdfDoc.save();
            // Envia o novo documento PDF como resposta
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=extracted_page.pdf');
            res.send(Buffer.from(pdf));
        }
        else {
            res.status(404).send('Conteúdo não encontrado.');
        }
    }
    catch (error) {
        console.error('Erro ao processar o PDF:', error);
        res.status(500).send('Erro ao processar o PDF.');
    }
};
exports.sendPdfByPost = sendPdfByPost;
