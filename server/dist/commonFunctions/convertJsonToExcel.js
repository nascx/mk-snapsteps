"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJsonToExcel = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const convertJsonToExcel = (jsonData) => {
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet('1');
    worksheet.getColumn('A').width = 20;
    worksheet.getColumn('B').width = 20;
    worksheet.getColumn('C').width = 20;
    worksheet.getColumn('D').width = 60;
    worksheet.getColumn('E').width = 20;
    worksheet.getColumn('F').width = 20;
    worksheet.getColumn('G').width = 20;
    jsonData.forEach((row) => {
        const rowData = [row.pm, row.page, row.it, row.activity, row.post, row.sequence, row.operations];
        worksheet.addRow(rowData);
    });
    worksheet.getCell('B1').font = { bold: true };
    worksheet.getCell('C1').font = { bold: true };
    worksheet.getCell('D1').font = { bold: true };
    worksheet.getCell('E1').font = { bold: true };
    worksheet.getCell('F1').font = { bold: true };
    worksheet.getCell('G1').font = { bold: true };
    return workbook;
};
exports.convertJsonToExcel = convertJsonToExcel;
