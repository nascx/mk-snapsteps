"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/commonFunctions/convertExcelToJson.ts
var _convertexceltojson = require('convert-excel-to-json'); var _convertexceltojson2 = _interopRequireDefault(_convertexceltojson);
var convertExcelToJson, convertExcelToJsonWithoutAlterLine;
var init_convertExcelToJson = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/commonFunctions/convertExcelToJson.ts"() {
    convertExcelToJson = exports.convertExcelToJson = (listPath, line) => {
      try {
        const result = _convertexceltojson2.default.call(void 0, 
          {
            sourceFile: listPath,
            sheets: [{
              name: "1",
              columnToKey: {
                A: "pm",
                B: "page",
                C: "it",
                D: "activity",
                E: "post",
                F: "sequence",
                G: "operations"
              }
            }]
          }
        );
        const jsonData = result["1"];
        const model = jsonData[0].pm;
        const product = jsonData[1].pm;
        jsonData[2].pm = line;
        const content = JSON.stringify(jsonData);
        return { model, product, content, line };
      } catch (error) {
        console.log({ message: "Error to convert excel to json", errorMessage: error });
      }
    };
    convertExcelToJsonWithoutAlterLine = exports.convertExcelToJsonWithoutAlterLine = (listPath) => {
      try {
        const result = _convertexceltojson2.default.call(void 0, 
          {
            sourceFile: listPath,
            sheets: [{
              name: "1",
              columnToKey: {
                A: "pm",
                B: "page",
                C: "it",
                D: "activity",
                E: "post",
                F: "sequence",
                G: "operations"
              }
            }]
          }
        );
        const jsonData = result["1"];
        const model = jsonData[0].pm;
        const product = jsonData[1].pm;
        const line = jsonData[2].pm;
        const content = JSON.stringify(jsonData);
        return { model, product, content, line };
      } catch (error) {
        console.log({ message: "Error to convert excel to json", errorMessage: error });
      }
    };
  }
});





exports.convertExcelToJson = convertExcelToJson; exports.convertExcelToJsonWithoutAlterLine = convertExcelToJsonWithoutAlterLine; exports.init_convertExcelToJson = init_convertExcelToJson;
//# sourceMappingURL=chunk-3RP4K4Z4.js.map