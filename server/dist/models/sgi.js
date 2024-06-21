"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertQAFile = exports.existsThisQAFile = exports.insertIT = exports.existsThisIT = void 0;
const db_1 = require("../config/db");
const existsThisIT = (path) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT name FROM its WHERE path = ?';
            await db_1.db.query(q, [path], (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data && data.length > 0) {
                    resolve({ status: true });
                }
                else {
                    resolve({ status: false });
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.existsThisIT = existsThisIT;
const insertIT = (path, name) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'INSERT INTO its (path, name) VALUES (?, ?)';
            await db_1.db.query(q, [path, name], (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data.affectedRows > 0) {
                    console.log('Arquivos inserido com sucesso na tabela its', data);
                    resolve(true);
                }
                else {
                    console.log('Por algum motivo os dados não foram inseridos na tabela de its!');
                    reject('Nenhum dado inserido na tabela de its!');
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.insertIT = insertIT;
const existsThisQAFile = (code) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT title FROM qa_files WHERE code = ?';
            await db_1.db.query(q, [code], (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data && data.length > 0) {
                    resolve({ status: true });
                }
                else {
                    resolve({ status: false });
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.existsThisQAFile = existsThisQAFile;
const insertQAFile = (code, title, path) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'INSERT INTO qa_files (code, title, path) VALUES (?, ?, ?)';
            await db_1.db.query(q, [code, title, path], (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                if (data.affectedRows > 0) {
                    console.log('Arquivos inserido com sucesso na tabela arquivos do qa', data);
                    resolve(true);
                }
                else {
                    console.log('Por algum motivo os dados não foram inseridos na tabela de arquivos do qa!');
                    reject('Nenhum dado inserido na tabela de its!');
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.insertQAFile = insertQAFile;
