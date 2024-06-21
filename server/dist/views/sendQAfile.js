"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendQAFile = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const sendQAFile = async (req, res) => {
    try {
        const { path } = req.query;
        const bytes = node_fs_1.default.readFileSync(path);
        // Envia o novo documento PDF como resposta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=extracted_page.pdf');
        res.send(Buffer.from(bytes));
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.sendQAFile = sendQAFile;
