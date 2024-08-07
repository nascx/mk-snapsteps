"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }



var _chunkJXC2HIDNjs = require('./chunk-JXC2HIDN.js');



var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/controllers/sgiCtrl.ts
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
function removeFileExtension(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}
var pdf2excel, excel2json, handleUploadIT, getInfosFromQAFile, handleUploadQualityFile;
var init_sgiCtrl = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/controllers/sgiCtrl.ts"() {
    _chunkJXC2HIDNjs.init_sgi.call(void 0, );
    pdf2excel = _chunkI5IDTQDIjs.__require.call(void 0, "pdf-to-excel");
    excel2json = _chunkI5IDTQDIjs.__require.call(void 0, "convert-excel-to-json");
    handleUploadIT = exports.handleUploadIT = async (req, res) => {
      try {
        const name = removeFileExtension(_optionalChain([req, 'optionalAccess', _ => _.file, 'optionalAccess', _2 => _2.filename]));
        const filePath = _path2.default.join(__dirname, `../_its/${_optionalChain([req, 'access', _3 => _3.file, 'optionalAccess', _4 => _4.originalname])}`);
        const it = await _chunkJXC2HIDNjs.existsThisIT.call(void 0, filePath);
        if (!it.status) {
          await _chunkJXC2HIDNjs.insertIT.call(void 0, filePath, name);
        } else {
          console.log("Arquivo j\xE1 est\xE1 salvo na base de dados!");
        }
        res.status(200).json("Dados salvos!");
      } catch (error) {
        res.status(500).json(error);
      }
    };
    getInfosFromQAFile = async (filePath, excelPath) => {
      try {
        return {};
      } catch (error) {
        console.log(error);
      }
    };
    handleUploadQualityFile = exports.handleUploadQualityFile = async (req, res) => {
      try {
        const orginalPath = _path2.default.join(__dirname, `../../_quality/${_optionalChain([req, 'access', _5 => _5.file, 'optionalAccess', _6 => _6.originalname])}`);
        const excelPath = _path2.default.join(__dirname, `../../_excels/${"a.xlsx"}`);
        const { code, title } = await getInfosFromQAFile(orginalPath, excelPath);
        console.log("code: ", code);
        res.status(200).json({ code, title });
      } catch (error) {
        res.status(500).json(error);
      }
    };
  }
});





exports.handleUploadIT = handleUploadIT; exports.handleUploadQualityFile = handleUploadQualityFile; exports.init_sgiCtrl = init_sgiCtrl;
//# sourceMappingURL=chunk-E7GFEBGB.js.map