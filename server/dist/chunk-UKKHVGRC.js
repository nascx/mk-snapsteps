"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkBXYDYC46js = require('./chunk-BXYDYC46.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/controllers/qaCtrl.ts
var sendQAFilesOptions;
var init_qaCtrl = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/controllers/qaCtrl.ts"() {
    _chunkBXYDYC46js.init_quality.call(void 0, );
    sendQAFilesOptions = exports.sendQAFilesOptions = async (req, res) => {
      try {
        const { value } = req.query;
        console.log(value);
        const data = await _chunkBXYDYC46js.searchQAFiles.call(void 0, value);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json(error);
        console.log(error);
      }
    };
  }
});




exports.sendQAFilesOptions = sendQAFilesOptions; exports.init_qaCtrl = init_qaCtrl;
//# sourceMappingURL=chunk-UKKHVGRC.js.map