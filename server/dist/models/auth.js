"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPassword = void 0;
const db_1 = require("../config/db");
const getPassword = async (sector) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT password FROM users WHERE sector = ?';
            await db_1.db.query(q, [sector], (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data && data.length > 0) {
                    resolve({ status: true, message: data[0].password });
                }
                else {
                    resolve({ status: false, message: 'Este setor não existe!' });
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.getPassword = getPassword;
