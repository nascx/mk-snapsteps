"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/views/sendQAfile.ts
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var sendQAFile;
var init_sendQAfile = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/views/sendQAfile.ts"() {
    sendQAFile = exports.sendQAFile = async (req, res) => {
      try {
        const { path } = req.query;
        const bytes = _fs2.default.readFileSync(path);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=extracted_page.pdf");
        res.send(Buffer.from(bytes));
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
});




exports.sendQAFile = sendQAFile; exports.init_sendQAfile = init_sendQAfile;
//# sourceMappingURL=chunk-SHU4PYSY.js.map