"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createList = void 0;
const convertExcelToJson_1 = require("../commonFunctions/convertExcelToJson");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const engineer_1 = require("../models/engineer");
const createList = async (req, res) => {
    try {
        console.log('Função chamada!');
        // prgando o caminho do arquivo que foi enviado
        const filePath = node_path_1.default.resolve(__dirname, `../../00_engineering_lists/${req.file?.originalname}`);
        console.log("parth:", filePath);
        // convertendo o conteúdo do arquivo em json
        const jsonData = (0, convertExcelToJson_1.convertExcelToJsonWithoutAlterLine)(filePath);
        // pegando o modelo desse conteúdo
        const model = jsonData?.model ?? 'error';
        // pegando o produto desse conteúdo
        const product = jsonData?.product ?? 'error';
        // pegando o conteúdo de instruções
        const content = jsonData?.content ?? 'error';
        //pegando o conteúdo da linha
        const line = jsonData?.line ?? 'error';
        // procurando se existe uma lista na tabela de listas de engenharia com esse modelo e produto
        const existListEng = await (0, engineer_1.exsitsThisListIEngineeringLists)(model, product);
        if (existListEng) {
            // se já existir deve ser atualizada
            await (0, engineer_1.updateListInEngineeringLists)(model, product, content, line);
        }
        else {
            // se não deve ser inserida
            await (0, engineer_1.insertListInEngineeringLists)(model, product, content, line);
        }
        // procurando se existe já existe uma lista na tabela de lista de produção com modelo e produto
        const existListProd = await (0, engineer_1.exsitsListsWithThisModelAndProductInProductionLists)(model, product);
        // se exitir atualiza cada um dessas listas
        if (existListProd.status) {
            existListProd.content.forEach((list) => {
                const json = (0, convertExcelToJson_1.convertExcelToJson)(filePath, list.line);
                (0, engineer_1.updateContentInProductionLists)(json?.content, model, product, list.line);
            });
        }
        else {
            console.log(existListProd);
        }
        node_fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.log('Erro ao excluir o arquivo!');
            }
            console.log('Arquivo excluído com sucesso!');
        });
        res.status(200).json('Operação concluída com sucesso!');
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.createList = createList;
// para fazer upload da lista de produção
