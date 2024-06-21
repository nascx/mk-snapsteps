"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.db = mysql_1.default.createConnection({
    host: process.env.DB_HOST || '10.12.100.14',
    user: process.env.DB_USER || 'sysweb',
    database: process.env.DB_DATABASE || 'snapsteps',
    password: process.env.DB_PASSWORD || 'ZqkNUCy9DnPjGuSG'
});
