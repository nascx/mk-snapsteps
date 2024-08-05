"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkDG44POUGjs = require('./chunk-DG44POUG.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/controllers/authCtrl.ts
var credentialCheck;
var init_authCtrl = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/controllers/authCtrl.ts"() {
    _chunkDG44POUGjs.init_auth.call(void 0, );
    credentialCheck = exports.credentialCheck = async (req, res) => {
      try {
        const { sector, password } = req.query;
        const crendials = await _chunkDG44POUGjs.getPassword.call(void 0, sector);
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
//# sourceMappingURL=chunk-D6N2Z4U6.js.map