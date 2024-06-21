"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateListInProductionLists = exports.saveNewListInProductionLists = exports.exsitsThisListInProductionLists = exports.searchByModelAndProductOptionsAndLine = exports.searchByModelAndProductOptions = exports.getContentFromEngineeringList = exports.getContentFromProductionList = void 0;
const db_1 = require("../config/db");
const getContentFromProductionList = async (model, product, line) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT content FROM production_lists WHERE model = ? AND product = ? AND line = ?';
            await db_1.db.query(q, [model, product, line], (err, data) => {
                if (err) {
                    console.log('Erro ao buscar por lista na tabela de listas de produção: ', err);
                    reject(err);
                }
                if (data && data.length > 0) {
                    console.log('Dados obtidos com sucesso!');
                    const content = JSON.parse(data[0].content);
                    resolve({ status: true, content: content });
                }
                else {
                    console.log('Não existe uma lista na tabela de listas de produção que satizfaça essa condição.');
                    resolve({ status: false, content: [] });
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.getContentFromProductionList = getContentFromProductionList;
const getContentFromEngineeringList = async (model, product) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT content FROM engineering_lists WHERE model = ? AND product = ?';
            await db_1.db.query(q, [model, product], (err, data) => {
                if (err) {
                    console.log('Erro ao buscar por lista na tabela de listas de engenharia: ', err);
                    reject(err);
                }
                if (data && data.length > 0) {
                    console.log('Dados obtidos com sucesso!');
                    const content = JSON.parse(data[0].content);
                    resolve({ status: true, content: content });
                }
                else {
                    console.log('Não existe uma lista na tabela de listas de engenharia que satizfaça essa condição.');
                    resolve({ status: false, content: [] });
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.getContentFromEngineeringList = getContentFromEngineeringList;
const searchByModelAndProductOptions = async () => {
    try {
        const q = 'SELECT model, product FROM engineering_lists';
        return new Promise(async (resolve, reject) => {
            await db_1.db.query(q, (err, data) => {
                if (err) {
                    console.log('Erro ao buscar por opções de Modelos e produtos');
                    reject(err);
                }
                if (data && data.length > 0) {
                    const models = data.map((row) => {
                        return { label: row.model, value: row.model };
                    });
                    const products = data.map((row) => {
                        return { label: row.product, value: row.product };
                    });
                    resolve({ models, products });
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.searchByModelAndProductOptions = searchByModelAndProductOptions;
const searchByModelAndProductOptionsAndLine = async () => {
    try {
        const q = 'SELECT model, product, line FROM production_lists';
        return new Promise(async (resolve, reject) => {
            await db_1.db.query(q, (err, data) => {
                if (err) {
                    console.log('Erro ao buscar por opções de Modelos e produtos');
                    reject(err);
                }
                if (data && data.length > 0) {
                    const models = data.map((row) => {
                        return { label: row.model, value: row.model };
                    });
                    const products = data.map((row) => {
                        return { label: row.product, value: row.product };
                    });
                    const lines = data.map((row) => {
                        return { label: row.line, value: row.line };
                    });
                    resolve({ models, products, lines });
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.searchByModelAndProductOptionsAndLine = searchByModelAndProductOptionsAndLine;
// para procurar se existe uma lista com model e produto e linha iguai na tabela de listas de produção
const exsitsThisListInProductionLists = (model, product, line) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT content FROM production_lists WHERE model = ? AND product = ? AND line = ?';
            const values = [model, product, line];
            await db_1.db.query(q, values, (err, data) => {
                if (err) {
                    console.log('Erro ao buscar por lista bna tabela de lista de produção!');
                    reject(err);
                }
                if (data && data.length > 0) {
                    console.log('Existe listas na tabela de listas de engenharia que usam esse modelo e produto');
                    resolve({ status: true, content: data[0].content });
                }
                else {
                    resolve({ status: false, content: [] });
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.exsitsThisListInProductionLists = exsitsThisListInProductionLists;
// para criar uma nova lista
const saveNewListInProductionLists = async (model, product, line, content) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'INSERT INTO production_lists (model, product, line, content) VALUES (?, ?, ?, ?)';
            await db_1.db.query(q, [model, product, line, content], (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data && data.affectedRows > 0) {
                    resolve('Dados inseridos com sucesso na tabela de lista de produção!');
                }
                else {
                    reject('Erro ao inserir os dados na tabela de lista de produção');
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.saveNewListInProductionLists = saveNewListInProductionLists;
// para atualizar os dados na lista de produção
const updateListInProductionLists = (model, product, line, content) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'UPDATE production_lists SET content = ? WHERE model = ? AND product = ? AND line = ?';
            const values = [content, model, product, line];
            await db_1.db.query(q, values, (err, data) => {
                if (err) {
                    console.log('Erro ao atualizar uma lista na tabela de listas de produção!', err);
                    reject(err);
                }
                if (data.affectedRows > 0) {
                    console.log('Arquivos atualizados com sucesso na tabela de lista de produção', data);
                    resolve(true);
                }
                else {
                    console.log('Por algum motivo os dados não foram atualizados na tabela de lista de produção!');
                    reject('Nenhum dado atualizado na tabela de lista de produção!');
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.updateListInProductionLists = updateListInProductionLists;
