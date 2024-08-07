"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }







var _chunkLW4OQGLWjs = require('./chunk-LW4OQGLW.js');



var _chunkZUKS5PBYjs = require('./chunk-ZUKS5PBY.js');



var _chunk3RP4K4Z4js = require('./chunk-3RP4K4Z4.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/controllers/producionCtrl.ts
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var downloadList, getModelAndProductOptions, getModelProductOptionsAndLine, uploadProductionLists, sendIT;
var init_producionCtrl = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/controllers/producionCtrl.ts"() {
    _chunkLW4OQGLWjs.init_production.call(void 0, );
    _chunkZUKS5PBYjs.init_convertJsonToExcel.call(void 0, );
    _chunk3RP4K4Z4js.init_convertExcelToJson.call(void 0, );
    downloadList = exports.downloadList = async (req, res) => {
      try {
        const { model, product, line } = req.query;
        const productionList = await _chunkLW4OQGLWjs.getContentFromProductionList.call(void 0, model, product, line);
        if (productionList.status) {
          const content = productionList.content;
          const workbook = await _chunkZUKS5PBYjs.convertJsonToExcel.call(void 0, content);
          workbook.xlsx.writeBuffer().then((data) => {
            res.setHeader("Content-Disposition", `attachment; filename="1.xlsx"`);
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.send(data);
          });
        } else {
          const engineeringList = await _chunkLW4OQGLWjs.getContentFromEngineeringList.call(void 0, model, product);
          if (engineeringList.status) {
            const content = engineeringList.content;
            const workbook = await _chunkZUKS5PBYjs.convertJsonToExcel.call(void 0, content);
            workbook.xlsx.writeBuffer().then((data) => {
              res.setHeader("Content-Disposition", `attachment; filename="1.xlsx"`);
              res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
              res.send(data);
            });
          } else {
            res.status(400).json("N\xE3o existe lista com esse modelo e produto!");
          }
        }
      } catch (error) {
        res.status(500).json(error);
      }
    };
    getModelAndProductOptions = exports.getModelAndProductOptions = async (req, res) => {
      try {
        const options = await _chunkLW4OQGLWjs.searchByModelAndProductOptionsAndLine.call(void 0, );
        res.status(200).json(options);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    getModelProductOptionsAndLine = exports.getModelProductOptionsAndLine = async (req, res) => {
      try {
        const options = await _chunkLW4OQGLWjs.searchByModelAndProductOptionsAndLine.call(void 0, );
        res.status(200).json(options);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    uploadProductionLists = exports.uploadProductionLists = async (req, res) => {
      try {
        const filePath = _path2.default.resolve(__dirname, `../../00_production_lists/${_optionalChain([req, 'access', _ => _.file, 'optionalAccess', _2 => _2.originalname])}`);
        const jsonData = _chunk3RP4K4Z4js.convertExcelToJsonWithoutAlterLine.call(void 0, filePath);
        const model = _optionalChain([jsonData, 'optionalAccess', _3 => _3.model]);
        const product = _optionalChain([jsonData, 'optionalAccess', _4 => _4.product]);
        const line = _optionalChain([jsonData, 'optionalAccess', _5 => _5.line]);
        const content = _optionalChain([jsonData, 'optionalAccess', _6 => _6.content]);
        const existThisListProd = await _chunkLW4OQGLWjs.exsitsThisListInProductionLists.call(void 0, model, product, line);
        if (existThisListProd.status) {
          console.log("J\xE1 exite lista com esse modelo e produto e linha");
          await _chunkLW4OQGLWjs.updateListInProductionLists.call(void 0, model, product, line, content);
        } else {
          console.log("Ainda n\xE3o existe lista com esse modelo produto e linha");
          await _chunkLW4OQGLWjs.saveNewListInProductionLists.call(void 0, model, product, line, content);
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
        console.log(error);
      }
    };
    sendIT = exports.sendIT = async (req, res) => {
      try {
        const { model, product, line } = req.query;
        const prodList = await _chunkLW4OQGLWjs.exsitsThisListInProductionLists.call(void 0, model, product, line);
        if (prodList.status) {
          const jsonData = JSON.parse(prodList.content);
          const postInfos = {};
          const posts = [];
          jsonData.map((row, i) => {
            if (i > 0) {
              if (!postInfos[row.post]) {
                postInfos[row.post] = [];
                postInfos[row.post].push({ it: row.it, page: Number(row.page) });
                posts.push(String(row.post));
              } else {
                postInfos[row.post].push({ it: row.it, page: Number(row.page) });
              }
            }
          });
          res.status(200).json({ postInfos, posts });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    };
  }
});








exports.downloadList = downloadList; exports.getModelAndProductOptions = getModelAndProductOptions; exports.getModelProductOptionsAndLine = getModelProductOptionsAndLine; exports.uploadProductionLists = uploadProductionLists; exports.sendIT = sendIT; exports.init_producionCtrl = init_producionCtrl;
//# sourceMappingURL=chunk-EOVUC6WC.js.map