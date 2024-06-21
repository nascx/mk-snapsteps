"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendQAFilesOptions = void 0;
const quality_1 = require("../models/quality");
const sendQAFilesOptions = async (req, res) => {
    try {
        const { value } = req.query;
        console.log(value);
        const data = await (0, quality_1.searchQAFiles)(value);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};
exports.sendQAFilesOptions = sendQAFilesOptions;
