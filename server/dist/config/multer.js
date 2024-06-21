"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadQuality = exports.uploadIT = exports.uploadProductionListsMulter = exports.uploadEngineeringLists = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// para salvar as listas de engenharia
const storageEngineeringList = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        const filePath = path_1.default.join(__dirname, '../../00_engineering_lists');
        console.log('Função chamada!');
        callback(null, filePath);
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname;
        callback(null, `${fileName}`);
    },
});
exports.uploadEngineeringLists = (0, multer_1.default)({ storage: storageEngineeringList });
// para salvar as listas de produção
const storageProductionList = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        const filePath = path_1.default.join(__dirname, '../../00_production_lists');
        console.log('Chamado no multer: ', filePath);
        callback(null, filePath);
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname;
        callback(null, `${fileName}`);
    },
});
exports.uploadProductionListsMulter = (0, multer_1.default)({ storage: storageProductionList });
// para salvar as IT'S
const storageIT = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        const filePath = path_1.default.join(__dirname, '../../_its');
        callback(null, filePath);
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname;
        callback(null, `${fileName}`);
    },
});
exports.uploadIT = (0, multer_1.default)({ storage: storageIT });
// Para salvar os arquivos da qualidade
const storageQuality = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        const filePath = path_1.default.join(__dirname, '../../_quality');
        callback(null, filePath);
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname;
        callback(null, `${fileName}`);
    },
});
exports.uploadQuality = (0, multer_1.default)({ storage: storageQuality });
