"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendIT = exports.uploadProductionLists = exports.getModelProductOptionsAndLine = exports.getModelAndProductOptions = exports.downloadList = void 0;
const production_1 = require("../models/production");
const convertJsonToExcel_1 = require("../commonFunctions/convertJsonToExcel");
const convertExcelToJson_1 = require("../commonFunctions/convertExcelToJson");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const downloadList = async (req, res) => {
    try {
        const { model, product, line } = req.query;
        const productionList = await (0, production_1.getContentFromProductionList)(model, product, line);
        if (productionList.status) {
            const content = productionList.content;
            const workbook = await (0, convertJsonToExcel_1.convertJsonToExcel)(content);
            workbook.xlsx.writeBuffer().then((data) => {
                res.setHeader('Content-Disposition', `attachment; filename="1.xlsx"`);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.send(data);
            });
        }
        else {
            const engineeringList = await (0, production_1.getContentFromEngineeringList)(model, product);
            if (engineeringList.status) {
                const content = engineeringList.content;
                const workbook = await (0, convertJsonToExcel_1.convertJsonToExcel)(content);
                workbook.xlsx.writeBuffer().then((data) => {
                    res.setHeader('Content-Disposition', `attachment; filename="1.xlsx"`);
                    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    res.send(data);
                });
            }
            else {
                res.status(400).json('Não existe lista com esse modelo e produto!');
            }
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.downloadList = downloadList;
const getModelAndProductOptions = async (req, res) => {
    try {
        const options = await (0, production_1.searchByModelAndProductOptions)();
        res.status(200).json(options);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getModelAndProductOptions = getModelAndProductOptions;
const getModelProductOptionsAndLine = async (req, res) => {
    try {
        const options = await (0, production_1.searchByModelAndProductOptionsAndLine)();
        res.status(200).json(options);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getModelProductOptionsAndLine = getModelProductOptionsAndLine;
// para upload de lista de produção
const uploadProductionLists = async (req, res) => {
    try {
        // pegando o caminho do arquivo 
        const filePath = node_path_1.default.resolve(__dirname, `../../00_production_lists/${req.file?.originalname}`);
        // convertendo o conteúdo do arquivo em json
        const jsonData = (0, convertExcelToJson_1.convertExcelToJsonWithoutAlterLine)(filePath);
        // pegando o modelo desse conteúdo
        const model = jsonData?.model;
        // pegando o produto desse conteúdo
        const product = jsonData?.product;
        // pegando a linha
        const line = jsonData?.line;
        // pegando o conteúdo de instruções
        const content = jsonData?.content;
        // agora pesquisa se dentro dessas tem uma com a linha especifica.
        const existThisListProd = await (0, production_1.exsitsThisListInProductionLists)(model, product, line);
        if (existThisListProd.status) {
            console.log('Já exite lista com esse modelo e produto e linha');
            await (0, production_1.updateListInProductionLists)(model, product, line, content);
        }
        else {
            console.log('Ainda não existe lista com esse modelo produto e linha');
            await (0, production_1.saveNewListInProductionLists)(model, product, line, content);
        }
        // apagando o arquivo do disco local.
        node_fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.log('Erro ao excluir o arquivo!');
            }
            console.log('Arquivo excluído com sucesso!');
        });
        // enviando uma resposta de confirmação de que todos os processos foram concluidos
        res.status(200).json('Operação concluída com sucesso!');
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};
exports.uploadProductionLists = uploadProductionLists;
// para devolver a IT com base na lista
const sendIT = async (req, res) => {
    try {
        // obtendo as informações da requisição
        const { model, product, line } = req.query;
        // verificando se essa combinação de informações existe
        const prodList = await (0, production_1.exsitsThisListInProductionLists)(model, product, line);
        // se existir deve pegar o conteúdo
        if (prodList.status) {
            // transformando em json
            const jsonData = JSON.parse(prodList.content);
            // criando um objeto para salvar as informações de cada it
            const postInfos = {};
            const posts = [];
            jsonData.map((row, i) => {
                if (i > 0) {
                    if (!postInfos[row.post]) {
                        postInfos[row.post] = [];
                        postInfos[row.post].push({ it: row.it, page: Number(row.page) });
                        posts.push(String(row.post));
                    }
                    else {
                        postInfos[row.post].push({ it: row.it, page: Number(row.page) });
                    }
                }
            });
            res.status(200).json({ postInfos, posts });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.sendIT = sendIT;
