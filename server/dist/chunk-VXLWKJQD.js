"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkWFX26W6Bjs = require('./chunk-WFX26W6B.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/controllers/authCtrl.ts
var credentialCheck;
var init_authCtrl = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/controllers/authCtrl.ts"() {
    _chunkWFX26W6Bjs.init_auth.call(void 0, );
    credentialCheck = exports.credentialCheck = async (req, res) => {
      try {
        const { sector, password } = req.query;
        const crendials = await _chunkWFX26W6Bjs.getPassword.call(void 0, sector);
        if (crendials.status) {
          if (crendials.message === password) {
            res.status(200).json({ message: "Credenciais v\xE1lidas" });
          } else {
            res.status(400).json({ message: "Senha incorreta" });
            return;
          }
        } else {
          res.status(404).json({ message: "Este setor n\xE3o existe" });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    };
  }
});




exports.credentialCheck = credentialCheck; exports.init_authCtrl = init_authCtrl;
//# sourceMappingURL=chunk-VXLWKJQD.js.map