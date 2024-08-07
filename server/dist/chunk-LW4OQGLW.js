"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunk6T4COZLAjs = require('./chunk-6T4COZLA.js');


var _chunkI5IDTQDIjs = require('./chunk-I5IDTQDI.js');

// src/models/production.ts
var getContentFromProductionList, getContentFromEngineeringList, searchByModelAndProductOptions, searchByModelAndProductOptionsAndLine, exsitsThisListInProductionLists, saveNewListInProductionLists, updateListInProductionLists;
var init_production = _chunkI5IDTQDIjs.__esm.call(void 0, {
  "src/models/production.ts"() {
    _chunk6T4COZLAjs.init_db.call(void 0, );
    getContentFromProductionList = exports.getContentFromProductionList = async (model, product, line) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "SELECT content FROM production_lists WHERE model = ? AND product = ? AND line = ?";
          await _chunk6T4COZLAjs.db.query(q, [model, product, line], (err, data) => {
            if (err) {
              console.log("Erro ao buscar por lista na tabela de listas de produ\xE7\xE3o: ", err);
              reject(err);
            }
            if (data && data.length > 0) {
              console.log("Dados obtidos com sucesso!");
              const content = JSON.parse(data[0].content);
              resolve({ status: true, content });
            } else {
              console.log("N\xE3o existe uma lista na tabela de listas de produ\xE7\xE3o que satizfa\xE7a essa condi\xE7\xE3o.");
              resolve({ status: false, content: [] });
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    getContentFromEngineeringList = exports.getContentFromEngineeringList = async (model, product) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "SELECT content FROM engineering_lists WHERE model = ? AND product = ?";
          await _chunk6T4COZLAjs.db.query(q, [model, product], (err, data) => {
            if (err) {
              console.log("Erro ao buscar por lista na tabela de listas de engenharia: ", err);
              reject(err);
            }
            if (data && data.length > 0) {
              console.log("Dados obtidos com sucesso!");
              const content = JSON.parse(data[0].content);
              resolve({ status: true, content });
            } else {
              console.log("N\xE3o existe uma lista na tabela de listas de engenharia que satizfa\xE7a essa condi\xE7\xE3o.");
              resolve({ status: false, content: [] });
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    searchByModelAndProductOptions = exports.searchByModelAndProductOptions = async () => {
      try {
        const q = "SELECT model, product FROM production_lists";
        return new Promise(async (resolve, reject) => {
          await _chunk6T4COZLAjs.db.query(q, (err, data) => {
            if (err) {
              console.log("Erro ao buscar por op\xE7\xF5es de Modelos e produtos");
              reject(err);
            }
            if (data && data.length > 0) {
              const models = data.map((row) => {
                return { label: row.model, value: row.model };
              });
              const products = data.map((row) => {
                return { label: row.product, value: row.product };
              });
              resolve({ models, products });
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    searchByModelAndProductOptionsAndLine = exports.searchByModelAndProductOptionsAndLine = async () => {
      try {
        const q = "SELECT model, product, line FROM production_lists";
        return new Promise(async (resolve, reject) => {
          await _chunk6T4COZLAjs.db.query(q, (err, data) => {
            if (err) {
              console.log("Erro ao buscar por op\xE7\xF5es de Modelos e produtos");
              reject(err);
            }
            const models = {};
            if (data && data.length > 0) {
              data.map((row) => {
                if (!models[row.model]) {
                  models[row.model] = { value: row.model, label: row.model };
                }
                return { label: row.model, value: row.model };
              });
              const products = {};
              data.map((row) => {
                if (!products[row.product]) {
                  products[row.product] = { label: row.product, value: row.product };
                }
                return { label: row.product, value: row.product };
              });
              const lines = {};
              data.map((row) => {
                if (!lines[row.line]) {
                  lines[row.line] = { label: row.line, value: row.line };
                }
                return { label: row.line, value: row.line };
              });
              resolve(
                {
                  models: Object.keys(models).map((key) => models[key]),
                  products: Object.keys(products).map((key) => products[key]),
                  lines: Object.keys(lines).map((key) => lines[key])
                }
              );
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    exsitsThisListInProductionLists = exports.exsitsThisListInProductionLists = (model, product, line) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "SELECT content FROM production_lists WHERE model = ? AND product = ? AND line = ?";
          const values = [model, product, line];
          await _chunk6T4COZLAjs.db.query(q, values, (err, data) => {
            if (err) {
              console.log("Erro ao buscar por lista bna tabela de lista de produ\xE7\xE3o!");
              reject(err);
            }
            if (data && data.length > 0) {
              console.log("Existe listas na tabela de listas de engenharia que usam esse modelo e produto");
              resolve({ status: true, content: data[0].content });
            } else {
              resolve({ status: false, content: [] });
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    saveNewListInProductionLists = exports.saveNewListInProductionLists = async (model, product, line, content) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "INSERT INTO production_lists (model, product, line, content) VALUES (?, ?, ?, ?)";
          await _chunk6T4COZLAjs.db.query(q, [model, product, line, content], (err, data) => {
            if (err) {
              reject(err);
            }
            if (data && data.affectedRows > 0) {
              resolve("Dados inseridos com sucesso na tabela de lista de produ\xE7\xE3o!");
            } else {
              reject("Erro ao inserir os dados na tabela de lista de produ\xE7\xE3o");
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
    updateListInProductionLists = exports.updateListInProductionLists = (model, product, line, content) => {
      try {
        return new Promise(async (resolve, reject) => {
          const q = "UPDATE production_lists SET content = ? WHERE model = ? AND product = ? AND line = ?";
          const values = [content, model, product, line];
          await _chunk6T4COZLAjs.db.query(q, values, (err, data) => {
            if (err) {
              console.log("Erro ao atualizar uma lista na tabela de listas de produ\xE7\xE3o!", err);
              reject(err);
            }
            if (data.affectedRows > 0) {
              console.log("Arquivos atualizados com sucesso na tabela de lista de produ\xE7\xE3o", data);
              resolve(true);
            } else {
              console.log("Por algum motivo os dados n\xE3o foram atualizados na tabela de lista de produ\xE7\xE3o!");
              reject("Nenhum dado atualizado na tabela de lista de produ\xE7\xE3o!");
            }
          });
        });
      } catch (error) {
        throw error;
      }
    };
  }
});










exports.getContentFromProductionList = getContentFromProductionList; exports.getContentFromEngineeringList = getContentFromEngineeringList; exports.searchByModelAndProductOptions = searchByModelAndProductOptions; exports.searchByModelAndProductOptionsAndLine = searchByModelAndProductOptionsAndLine; exports.exsitsThisListInProductionLists = exsitsThisListInProductionLists; exports.saveNewListInProductionLists = saveNewListInProductionLists; exports.updateListInProductionLists = updateListInProductionLists; exports.init_production = init_production;
//# sourceMappingURL=chunk-LW4OQGLW.js.map