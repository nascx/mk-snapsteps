"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunk6T4COZLAjs = require('./chunk-6T4COZLA.js');

// src/models/engineer.ts
_chunk6T4COZLAjs.init_db.call(void 0, );
var exsitsThisListIEngineeringLists = (model, product) => {
  try {
    console.log("----------");
    console.log("Come\xE7ando a verifica\xE7\xE3o se j\xE1 existe essa lista na tabela de lista de engenharia");
    return new Promise(async (resolve, reject) => {
      const q = "SELECT id FROM engineering_lists WHERE model = ? AND product = ?";
      const values = [model, product];
      await _chunk6T4COZLAjs.db.query(q, values, (err, data) => {
        if (err) {
          console.log("Ocorreu um erro na verifica\xE7\xE3o!", err);
          reject(err);
        }
        if (data && data.length > 0) {
          console.log("Essa lista j\xE1 existe");
          resolve(true);
        } else {
          console.log("N\xE3o foi encontrada nenhuma lista");
          resolve(false);
        }
      });
      console.log("----------");
    });
  } catch (error) {
    throw error;
  }
};
var insertListInEngineeringLists = (model, product, content, line) => {
  try {
    console.log("Come\xE7ando inser\xE7\xE3o de dados!");
    return new Promise(async (resolve, reject) => {
      const q = "INSERT INTO engineering_lists ( model, product, content, line) VALUES (?, ?, ?, ?)";
      const values = [model, product, content, line];
      await _chunk6T4COZLAjs.db.query(q, values, (err, data) => {
        if (err) {
          console.log("Erro ao inserir dados!", err);
          reject(err);
        }
        if (data && data.affectedRows > 0) {
          console.log("Arquivos inseridos com sucesso");
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
var updateListInEngineeringLists = (model, product, content, line) => {
  try {
    console.log("come\xE7ando a atualiza\xE7\xE3o do conteudo");
    return new Promise(async (resolve, reject) => {
      const q = "UPDATE engineering_lists SET content = ? WHERE model = ? AND product = ? AND line = ?";
      const values = [content, model, product, line];
      await _chunk6T4COZLAjs.db.query(q, values, (err, data) => {
        if (err) {
          console.log("Erro ao atualizar uma lista", err);
          reject(err);
        }
        if (data.affectedRows > 0) {
          console.log("Arquivos atualizados com sucesso");
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
var exsitsListsWithThisModelAndProductInProductionLists = (model, product) => {
  try {
    console.log("Come\xE7ando a verifica\xE7\xE3o se existe esta lista na tebala da produ\xE7\xE3o");
    return new Promise(async (resolve, reject) => {
      const q = "SELECT line FROM production_lists WHERE model = ? AND product = ?";
      const values = [model, product];
      await _chunk6T4COZLAjs.db.query(q, values, (err, data) => {
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
var updateContentInProductionLists = (content, model, product, line) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "UPDATE production_lists SET content = ? WHERE model = ? AND product = ? AND line = ?";
      const values = [content, model, product, line];
      await _chunk6T4COZLAjs.db.query(q, values, (err, data) => {
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







exports.exsitsThisListIEngineeringLists = exsitsThisListIEngineeringLists; exports.insertListInEngineeringLists = insertListInEngineeringLists; exports.updateListInEngineeringLists = updateListInEngineeringLists; exports.exsitsListsWithThisModelAndProductInProductionLists = exsitsListsWithThisModelAndProductInProductionLists; exports.updateContentInProductionLists = updateContentInProductionLists;
//# sourceMappingURL=chunk-CP3TGI3B.js.map