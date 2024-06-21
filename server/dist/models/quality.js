"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQAFiles = void 0;
const db_1 = require("../config/db");
const searchQAFiles = (value) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT code, title, path FROM qa_files WHERE code LIKE ? OR title LIKE ?';
            await db_1.db.query(q, [`%${value}%`, `%${value}%`], (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data && data.length > 0) {
                    resolve(data);
                }
                else {
                    resolve([]);
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.searchQAFiles = searchQAFiles;
