"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var _chunk63L5HF62js = require('./chunk-63L5HF62.js');



var _chunkXD6GC3VNjs = require('./chunk-XD6GC3VN.js');
require('./chunk-7VNMNW4X.js');
require('./chunk-ABKZQFEX.js');
require('./chunk-GU6YLGOQ.js');



var _chunkSHU4PYSYjs = require('./chunk-SHU4PYSY.js');



var _chunkFHZ2Z3XZjs = require('./chunk-FHZ2Z3XZ.js');




var _chunkDXXSPAZGjs = require('./chunk-DXXSPAZG.js');
require('./chunk-DUIYWRJ2.js');
require('./chunk-C5GCJCLC.js');






var _chunkATZ644WYjs = require('./chunk-ATZ644WY.js');



var _chunkD6N2Z4U6js = require('./chunk-D6N2Z4U6.js');
require('./chunk-DG44POUG.js');



var _chunkE6LBBUPFjs = require('./chunk-E6LBBUPF.js');
require('./chunk-XPIWGOOX.js');







var _chunkBWDYNXERjs = require('./chunk-BWDYNXER.js');
require('./chunk-7D2CMYFX.js');
require('./chunk-ZUKS5PBY.js');
require('./chunk-3RP4K4Z4.js');
require('./chunk-TUARQIGF.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/snapsteps.ts
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _dotenv = require('dotenv');
var require_snapsteps = _chunkI5IDTQDIjs.__commonJS.call(void 0, {
  "src/snapsteps.ts"() {
    _chunkATZ644WYjs.init_multer.call(void 0, );
    _chunkE6LBBUPFjs.init_engineerCtrl.call(void 0, );
    _chunkBWDYNXERjs.init_producionCtrl.call(void 0, );
    _chunkDXXSPAZGjs.init_sgiCtrl.call(void 0, );
    _chunk63L5HF62js.init_sendCompletePdf.call(void 0, );
    _chunkXD6GC3VNjs.init_sendPDfByPost.call(void 0, );
    _chunkFHZ2Z3XZjs.init_qaCtrl.call(void 0, );
    _chunkSHU4PYSYjs.init_sendQAfile.call(void 0, );
    _chunkD6N2Z4U6js.init_authCtrl.call(void 0, );
    _dotenv.config.call(void 0, );
    var snapsteps = _express2.default.call(void 0, );
    snapsteps.use(_express2.default.json());
    snapsteps.use(_cors2.default.call(void 0, ));
    snapsteps.get("/auth", _chunkD6N2Z4U6js.credentialCheck);
    snapsteps.post("/eng/list-upload", _chunkATZ644WYjs.uploadEngineeringLists.single("list"), _chunkE6LBBUPFjs.createList);
    snapsteps.get("/prod/download-list", _chunkBWDYNXERjs.downloadList);
    snapsteps.get("/get-model-and-product-options", _chunkBWDYNXERjs.getModelAndProductOptions);
    snapsteps.post("/production/upload-file", _chunkATZ644WYjs.uploadProductionListsMulter.single("prod-list"), _chunkBWDYNXERjs.uploadProductionLists);
    snapsteps.post("/sgi/upload-it", _chunkATZ644WYjs.uploadIT.single("it"), _chunkDXXSPAZGjs.handleUploadIT);
    snapsteps.get("/production/download-it", _chunkBWDYNXERjs.sendIT);
    snapsteps.get("/production/get-options-to-pdf", _chunkBWDYNXERjs.getModelProductOptionsAndLine);
    snapsteps.get("/pdf", _chunk63L5HF62js.sendPdf);
    snapsteps.get("/pdf-by-post", _chunkXD6GC3VNjs.sendPdfByPost);
    snapsteps.post("/sgi/upload-quality-file", _chunkATZ644WYjs.uploadQuality.single("quality"), _chunkDXXSPAZGjs.handleUploadQualityFile);
    snapsteps.get("/qa/get-files", _chunkFHZ2Z3XZjs.sendQAFilesOptions);
    snapsteps.get("/qa/view-it", _chunkSHU4PYSYjs.sendQAFile);
    var port = process.env.PORT || 4322;
    snapsteps.listen(port, () => {
      console.log("Server listen in ", port, "port");
    });
  }
});
exports. default = require_snapsteps();
//# sourceMappingURL=snapsteps.js.map