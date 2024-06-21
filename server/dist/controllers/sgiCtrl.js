"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploadQualityFile = exports.handleUploadIT = void 0;
const node_path_1 = __importDefault(require("node:path"));
const sgi_1 = require("../models/sgi");
const node_fs_1 = __importDefault(require("node:fs"));
//importação da biblioteca para converter pdf para excel
const pdf2excel = require('pdf-to-excel');
//importação da biblioteca para converter excel em json
const excel2json = require('convert-excel-to-json');
function removeFileExtension(filename) {
    return filename.replace(/\.[^/.]+$/, "");
}
const handleUploadIT = async (req, res) => {
    try {
        //pegando o caminho da IT
        const name = removeFileExtension(req?.file?.filename);
        const filePath = node_path_1.default.join(__dirname, `../_its/${req.file?.originalname}`);
        //pesquisando se já existe esse arquivo salvo na base de dados
        const it = await (0, sgi_1.existsThisIT)(filePath);
        // se não exsitir deve inserir
        if (!it.status) {
            await (0, sgi_1.insertIT)(filePath, name);
        }
        else {
            console.log('Arquivo já está salvo na base de dados!');
        }
        res.status(200).json('Dados salvos!');
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.handleUploadIT = handleUploadIT;
const getInfosFromQAFile = async (filePath, excelPath) => {
    //criando o arquivo excel
    await pdf2excel.genXlsx(filePath, excelPath);
    //convertendo o excel em json
    const json = await excel2json({ sourceFile: excelPath, header: { rows: 1 } });
    //obtendo as informções do json
    const jsonInfos = json.Sheet1;
    // pegando o objeto aonde estão as informações de título
    const titleJson = jsonInfos[1];
    // criando a variável para armazenar a string que contem o conteúdo do título
    let title = '';
    // criando um contador para obter aumentar ao percorrer o objeto e encontrar o indice certo
    let count = 0;
    // percorrendo o objeto até pegar o conteúdo do titulo
    for (let key in titleJson) {
        if (count > 2) {
            title += titleJson[key];
        }
        count++;
    }
    // pegando o objeto aonde está as informações do código
    const codeJson = jsonInfos[5];
    // criando variável para armazenar o valor do código
    let code = '';
    // criando um contador para achar o indice certo
    let i = 0;
    // percorrendo o objeto até achar o valor correto
    for (let key in codeJson) {
        if (codeJson[key] === 'CÓDIGO:') {
            let index = 0;
            for (let key in codeJson) {
                if (index === i + 2) {
                    code = codeJson[key];
                }
                index++;
            }
        }
        i++;
    }
    return { code, title };
};
const handleUploadQualityFile = async (req, res) => {
    try {
        console.log('função chamada!');
        const orginalPath = node_path_1.default.join(__dirname, `../../_quality/${req.file?.originalname}`);
        const excelPath = node_path_1.default.join(__dirname, `../../_excels/${'teste.xlsx'}`);
        const { code, title } = await getInfosFromQAFile(orginalPath, excelPath);
        const qaFile = await (0, sgi_1.existsThisQAFile)(code);
        const filePath = node_path_1.default.join(__dirname, `../../_quality/${code}.pdf`);
        node_fs_1.default.renameSync(orginalPath, filePath);
        if (qaFile.status) {
            console.log('Já existe IT do QA com esse código');
        }
        else {
            await (0, sgi_1.insertQAFile)(code, title, filePath);
        }
        node_fs_1.default.unlinkSync(excelPath);
        res.status(200).json({ code, title });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.handleUploadQualityFile = handleUploadQualityFile;
