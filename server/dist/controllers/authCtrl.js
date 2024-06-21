"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialCheck = void 0;
const auth_1 = require("../models/auth");
const credentialCheck = async (req, res) => {
    try {
        const { sector, password } = req.query;
        const crendials = await (0, auth_1.getPassword)(sector);
        if (crendials.status) {
            if (crendials.message === password) {
                res.status(200).json({ message: 'Credenciais válidas' });
            }
            else {
                res.status(400).json({ message: 'Senha incorreta' });
                return;
            }
        }
        else {
            res.status(404).json({ message: 'Este setor não existe' });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.credentialCheck = credentialCheck;
