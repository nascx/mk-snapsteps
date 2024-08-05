"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkTUARQIGFjs = require('./chunk-TUARQIGF.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/models/engineer.ts
var exsitsThisListIEngineeringLists, insertListInEngineeringLists, updateListInEngineeringLists, exsitsListsWithThisModelAndProductInProductionLists, updateContentInProductionLists;
var init_engineer = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/models/engineer.ts"() {
    _chunkTUARQIGFjs.init_db.call(void 0, );
    exsitsThisListIEngineeringLists = exports.exsitsThisListIEngineeringLists = (model, product) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "SELECT id FROM engineering_lists WHERE model = ? AND product = ?";
          const values = [model, product];
          await _chunkTUARQIGFjs.db.query(q, values, (err, data) => {
            if (err) {
              console.log("Erro ao fazer consulta se existe est\xE1 lista na lista de engenharia!", err);
              reject(err);
            }
            if (data && data.length > 0) {
              resolve(true);
            } else {
              console.log("Nada encontrado na busca se existe est\xE1 lista na lista de engenharia!");
              resolve(false);
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    insertListInEngineeringLists = exports.insertListInEngineeringLists = (model, product, content, line) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "INSERT INTO engineering_lists ( model, product, content, line) VALUES (?, ?, ?, ?)";
          const values = [model, product, content, line];
          await _chunkTUARQIGFjs.db.query(q, values, (err, data) => {
            if (err) {
              console.log("Erro ao inserir uma lista na tabela de listas da engenharia!", err);
              reject(err);
            }
            if (data && data.affectedRows > 0) {
              console.log("Arquivos inseridos com sucesso", data);
              resolve(true);
            } else {
              console.log("Por algum motivo os dados n\xE3o foram inseridos!");
              reject("Nenhum dado inserido na tabela de lista de engenharia!");
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    updateListInEngineeringLists = exports.updateListInEngineeringLists = (model, product, content, line) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "UPDATE engineering_lists SET content = ? WHERE model = ? AND product = ? AND line = ?";
          const values = [content, model, product, line];
          await _chunkTUARQIGFjs.db.query(q, values, (err, data) => {
            if (err) {
              console.log("Erro ao atualizar uma lista na tabela de listas da engenharia!", err);
              reject(err);
            }
            if (data.affectedRows > 0) {
              console.log("Arquivos atualizados com sucesso", data);
              resolve(true);
            } else {
              console.log("Por algum motivo os dados n\xE3o foram atualizados!");
              reject("Nenhum dado atualizado na tabela de lista de engenharia!");
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    exsitsListsWithThisModelAndProductInProductionLists = exports.exsitsListsWithThisModelAndProductInProductionLists = (model, product) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "SELECT line FROM production_lists WHERE model = ? AND product = ?";
          const values = [model, product];
          await _chunkTUARQIGFjs.db.query(q, values, (err, data) => {
            if (err) {
              console.log("Erro ao buscar por lista bna tabela de lista de produ\xE7\xE3o!");
              reject(err);
            }
            if (data && data.length > 0) {
              console.log("Existe listas na tabela de listas de engenharia que usam esse modelo e produto");
              resolve({ status: true, content: data });
            } else {
              resolve({ status: false, content: [] });
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    updateContentInProductionLists = exports.updateContentInProductionLists = (content, model, product, line) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "UPDATE production_lists SET content = ? WHERE model = ? AND product = ? AND line = ?";
          const values = [content, model, product, line];
          await _chunkTUARQIGFjs.db.query(q, values, (err, data) => {
            if (err) {
              console.log(`Erro ao atualizar o conte\xFAdo: ${model}-${product}-${line}`);
              reject(err);
            }
            if (data.affectedRows > 0) {
              console.log("Dados de lista de produ\xE7\xE3o atualizados");
              resolve(true);
            } else {
              console.log("Por algum motivo o conte\xFAdo da lista de produ\xE7\xE3o n\xE3o foi atualizado!");
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
  }
});








exports.exsitsThisListIEngineeringLists = exsitsThisListIEngineeringLists; exports.insertListInEngineeringLists = insertListInEngineeringLists; exports.updateListInEngineeringLists = updateListInEngineeringLists; exports.exsitsListsWithThisModelAndProductInProductionLists = exsitsListsWithThisModelAndProductInProductionLists; exports.updateContentInProductionLists = updateContentInProductionLists; exports.init_engineer = init_engineer;
//# sourceMappingURL=chunk-XPIWGOOX.js.map