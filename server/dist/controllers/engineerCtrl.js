"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }



var _chunk3RP4K4Z4js = require('../chunk-3RP4K4Z4.js');






var _chunkCP3TGI3Bjs = require('../chunk-CP3TGI3B.js');
require('../chunk-6T4COZLA.js');
require('../chunk-I5IDTQDI.js');

// src/controllers/engineerCtrl.ts
_chunk3RP4K4Z4js.init_convertExcelToJson.call(void 0, );
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var createList = async (req, res) => {
  try {
    const filePath = _path2.default.resolve(__dirname, `../../00_engineering_lists/${_optionalChain([req, 'access', _ => _.file, 'optionalAccess', _2 => _2.originalname])}`);
    const jsonData = _chunk3RP4K4Z4js.convertExcelToJsonWithoutAlterLine.call(void 0, filePath);
    const model = _nullishCoalesce(_optionalChain([jsonData, 'optionalAccess', _3 => _3.model]), () => ( ""));
    const product = _nullishCoalesce(_optionalChain([jsonData, 'optionalAccess', _4 => _4.product]), () => ( ""));
    const content = _nullishCoalesce(_optionalChain([jsonData, 'optionalAccess', _5 => _5.content]), () => ( ""));
    const line = _nullishCoalesce(_optionalChain([jsonData, 'optionalAccess', _6 => _6.line]), () => ( ""));
    const existListEng = await _chunkCP3TGI3Bjs.exsitsThisListIEngineeringLists.call(void 0, model, product);
    if (existListEng) {
      await _chunkCP3TGI3Bjs.updateListInEngineeringLists.call(void 0, model, product, content, line);
    } else {
      await _chunkCP3TGI3Bjs.insertListInEngineeringLists.call(void 0, model, product, content, line);
    }
    const existListProd = await _chunkCP3TGI3Bjs.exsitsListsWithThisModelAndProductInProductionLists.call(void 0, model, product);
    if (existListProd.status) {
      existListProd.content.forEach((list) => {
        const json = _chunk3RP4K4Z4js.convertExcelToJson.call(void 0, filePath, list.line);
        _chunkCP3TGI3Bjs.updateContentInProductionLists.call(void 0, _optionalChain([json, 'optionalAccess', _7 => _7.content]), model, product, list.line);
      });
    } else {
      console.log(existListProd);
    }
    _fs2.default.unlink(filePath, (err) => {
      if (err) {
        console.log("Erro ao excluir o arquivo!");
      }
      console.log("Arquivo exclu\xEDdo com sucesso!");
    });
    res.status(200).json("Opera\xE7\xE3o conclu\xEDda com sucesso!");
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.createList = createList;
//# sourceMappingURL=engineerCtrl.js.map