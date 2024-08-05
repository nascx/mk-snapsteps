import ExcelJS from 'exceljs';

declare const convertJsonToExcel: (jsonData: []) => ExcelJS.Workbook;

export { convertJsonToExcel };
