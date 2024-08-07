"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var _chunkIVTKHCBKjs = require('./chunk-IVTKHCBK.js');



var _chunkLBEWYUBGjs = require('./chunk-LBEWYUBG.js');
require('./chunk-7VNMNW4X.js');
require('./chunk-ABKZQFEX.js');
require('./chunk-GU6YLGOQ.js');



var _chunkSHU4PYSYjs = require('./chunk-SHU4PYSY.js');



var _chunkUKKHVGRCjs = require('./chunk-UKKHVGRC.js');




var _chunkE7GFEBGBjs = require('./chunk-E7GFEBGB.js');
require('./chunk-BXYDYC46.js');
require('./chunk-JXC2HIDN.js');






var _chunkAOF3O3MJjs = require('./chunk-AOF3O3MJ.js');



var _chunkVXLWKJQDjs = require('./chunk-VXLWKJQD.js');
require('./chunk-WFX26W6B.js');







var _chunkEOVUC6WCjs = require('./chunk-EOVUC6WC.js');
require('./chunk-LW4OQGLW.js');
require('./chunk-ZUKS5PBY.js');
require('./chunk-3RP4K4Z4.js');
require('./chunk-6T4COZLA.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/snapsteps.ts
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _dotenv = require('dotenv');
var require_snapsteps = _chunkI5IDTQDIjs.__commonJS.call(void 0, {
  "src/snapsteps.ts"() {
    _chunkAOF3O3MJjs.init_multer.call(void 0, );
    _chunkEOVUC6WCjs.init_producionCtrl.call(void 0, );
    _chunkE7GFEBGBjs.init_sgiCtrl.call(void 0, );
    _chunkIVTKHCBKjs.init_sendCompletePdf.call(void 0, );
    _chunkLBEWYUBGjs.init_sendPDfByPost.call(void 0, );
    _chunkUKKHVGRCjs.init_qaCtrl.call(void 0, );
    _chunkSHU4PYSYjs.init_sendQAfile.call(void 0, );
    _chunkVXLWKJQDjs.init_authCtrl.call(void 0, );
    _dotenv.config.call(void 0, );
    var snapsteps = _express2.default.call(void 0, );
    snapsteps.use(_express2.default.json());
    snapsteps.use(_cors2.default.call(void 0, ));
    snapsteps.get("/auth", _chunkVXLWKJQDjs.credentialCheck);
    snapsteps.post("/eng/list-upload", _chunkAOF3O3MJjs.uploadEngineeringLists.single("list"), _chunkEOVUC6WCjs.uploadProductionLists);
    snapsteps.get("/prod/download-list", _chunkEOVUC6WCjs.downloadList);
    snapsteps.get("/get-model-and-product-options", _chunkEOVUC6WCjs.getModelAndProductOptions);
    snapsteps.post("/production/upload-file", _chunkAOF3O3MJjs.uploadProductionListsMulter.single("prod-list"), _chunkEOVUC6WCjs.uploadProductionLists);
    snapsteps.post("/sgi/upload-it", _chunkAOF3O3MJjs.uploadIT.single("it"), _chunkE7GFEBGBjs.handleUploadIT);
    snapsteps.get("/production/download-it", _chunkEOVUC6WCjs.sendIT);
    snapsteps.get("/production/get-options-to-pdf", _chunkEOVUC6WCjs.getModelProductOptionsAndLine);
    snapsteps.get("/pdf", _chunkIVTKHCBKjs.sendPdf);
    snapsteps.get("/pdf-by-post", _chunkLBEWYUBGjs.sendPdfByPost);
    snapsteps.post("/sgi/upload-quality-file", _chunkAOF3O3MJjs.uploadQuality.single("quality"), _chunkE7GFEBGBjs.handleUploadQualityFile);
    snapsteps.get("/qa/get-files", _chunkUKKHVGRCjs.sendQAFilesOptions);
    snapsteps.get("/qa/view-it", _chunkSHU4PYSYjs.sendQAFile);
    var port = process.env.PORT || 4322;
    snapsteps.listen(port, () => {
      console.log("Server listen in ", port, "port");
    });
  }
});
exports. default = require_snapsteps();
//# sourceMappingURL=snapsteps.js.map