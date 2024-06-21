"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertExcelToJsonWithoutAlterLine = exports.convertExcelToJson = void 0;
const convert_excel_to_json_1 = __importDefault(require("convert-excel-to-json"));
const convertExcelToJson = (listPath, line) => {
    try {
        const result = (0, convert_excel_to_json_1.default)({
            sourceFile: listPath,
            sheets: [{
                    name: '1',
                    columnToKey: {
                        A: 'pm',
                        B: 'page',
                        C: 'it',
                        D: 'activity',
                        E: 'post',
                        F: 'sequence',
                        G: 'operations'
                    }
                }]
        });
        const jsonData = result['1'];
        const model = jsonData[0].pm;
        const product = jsonData[1].pm;
        jsonData[2].pm = line;
        const content = JSON.stringify(jsonData);
        return { model, product, content, line };
    }
    catch (error) {
        console.log({ message: 'Error to convert excel to json', errorMessage: error });
    }
};
exports.convertExcelToJson = convertExcelToJson;
const convertExcelToJsonWithoutAlterLine = (listPath) => {
    try {
        const result = (0, convert_excel_to_json_1.default)({
            sourceFile: listPath,
            sheets: [{
                    name: '1',
                    columnToKey: {
                        A: 'pm',
                        B: 'page',
                        C: 'it',
                        D: 'activity',
                        E: 'post',
                        F: 'sequence',
                        G: 'operations'
                    }
                }]
        });
        const jsonData = result['1'];
        const model = jsonData[0].pm;
        const product = jsonData[1].pm;
        const line = jsonData[2].pm;
        const content = JSON.stringify(jsonData);
        return { model, product, content, line };
    }
    catch (error) {
        console.log({ message: 'Error to convert excel to json', errorMessage: error });
    }
};
exports.convertExcelToJsonWithoutAlterLine = convertExcelToJsonWithoutAlterLine;
