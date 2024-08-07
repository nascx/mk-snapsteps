"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/config/multer.ts
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var storageEngineeringList, uploadEngineeringLists, storageProductionList, uploadProductionListsMulter, storageIT, uploadIT, storageQuality, uploadQuality;
var init_multer = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/config/multer.ts"() {
    storageEngineeringList = _multer2.default.diskStorage({
      destination: (req, file, callback) => {
        const filePath = _path2.default.join(__dirname, "../../00_production_lists");
        console.log("Fun\xE7\xE3o chamada!");
        callback(null, filePath);
      },
      filename: function(req, file, callback) {
        const fileName = file.originalname;
        callback(null, `${fileName}`);
      }
    });
    uploadEngineeringLists = exports.uploadEngineeringLists = _multer2.default.call(void 0, { storage: storageEngineeringList });
    storageProductionList = _multer2.default.diskStorage({
      destination: (req, file, callback) => {
        const filePath = _path2.default.join(__dirname, "../../00_production_lists");
        console.log("Chamado no multer: ", filePath);
        callback(null, filePath);
      },
      filename: function(req, file, callback) {
        const fileName = file.originalname;
        callback(null, `${fileName}`);
      }
    });
    uploadProductionListsMulter = exports.uploadProductionListsMulter = _multer2.default.call(void 0, { storage: storageProductionList });
    storageIT = _multer2.default.diskStorage({
      destination: (req, file, callback) => {
        const filePath = _path2.default.join(__dirname, "../_its");
        callback(null, filePath);
      },
      filename: function(req, file, callback) {
        const fileName = file.originalname;
        callback(null, `${fileName}`);
      }
    });
    uploadIT = exports.uploadIT = _multer2.default.call(void 0, { storage: storageIT });
    storageQuality = _multer2.default.diskStorage({
      destination: (req, file, callback) => {
        const filePath = _path2.default.join(__dirname, "../../_quality");
        callback(null, filePath);
      },
      filename: function(req, file, callback) {
        const fileName = file.originalname;
        callback(null, `${fileName}`);
      }
    });
    uploadQuality = exports.uploadQuality = _multer2.default.call(void 0, { storage: storageQuality });
  }
});







exports.uploadEngineeringLists = uploadEngineeringLists; exports.uploadProductionListsMulter = uploadProductionListsMulter; exports.uploadIT = uploadIT; exports.uploadQuality = uploadQuality; exports.init_multer = init_multer;
//# sourceMappingURL=chunk-6RML42TE.js.map