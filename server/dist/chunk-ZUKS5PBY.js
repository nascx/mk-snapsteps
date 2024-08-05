"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/commonFunctions/convertJsonToExcel.ts
var _exceljs = require('exceljs'); var _exceljs2 = _interopRequireDefault(_exceljs);
var convertJsonToExcel;
var init_convertJsonToExcel = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/commonFunctions/convertJsonToExcel.ts"() {
    convertJsonToExcel = exports.convertJsonToExcel = (jsonData) => {
      const workbook = new _exceljs2.default.Workbook();
      const worksheet = workbook.addWorksheet("1");
      worksheet.getColumn("A").width = 20;
      worksheet.getColumn("B").width = 20;
      worksheet.getColumn("C").width = 20;
      worksheet.getColumn("D").width = 60;
      worksheet.getColumn("E").width = 20;
      worksheet.getColumn("F").width = 20;
      worksheet.getColumn("G").width = 20;
      jsonData.forEach((row) => {
        const rowData = [row.pm, row.page, row.it, row.activity, row.post, row.sequence, row.operations];
        worksheet.addRow(rowData);
      });
      worksheet.getCell("B1").font = { bold: true };
      worksheet.getCell("C1").font = { bold: true };
      worksheet.getCell("D1").font = { bold: true };
      worksheet.getCell("E1").font = { bold: true };
      worksheet.getCell("F1").font = { bold: true };
      worksheet.getCell("G1").font = { bold: true };
      return workbook;
    };
  }
});




exports.convertJsonToExcel = convertJsonToExcel; exports.init_convertJsonToExcel = init_convertJsonToExcel;
//# sourceMappingURL=chunk-ZUKS5PBY.js.map