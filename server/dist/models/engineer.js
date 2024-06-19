"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/models/engineer.ts
var engineer_exports = {};
__export(engineer_exports, {
  exsitsListsWithThisModelAndProductInProductionLists: () => exsitsListsWithThisModelAndProductInProductionLists,
  exsitsThisListIEngineeringLists: () => exsitsThisListIEngineeringLists,
  insertListInEngineeringLists: () => insertListInEngineeringLists,
  updateContentInProductionLists: () => updateContentInProductionLists,
  updateListInEngineeringLists: () => updateListInEngineeringLists
});
module.exports = __toCommonJS(engineer_exports);

// src/config/db.ts
var import_mysql = __toESM(require("mysql"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var db = import_mysql.default.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

// src/models/engineer.ts
var exsitsThisListIEngineeringLists = (model, product) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT id FROM engineering_lists WHERE model = ? AND product = ?";
      const values = [model, product];
      await db.query(q, values, (err, data) => {
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
var insertListInEngineeringLists = (model, product, content) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "INSERT INTO engineering_lists ( model, product, content) VALUES (?, ?, ?)";
      const values = [model, product, content];
      await db.query(q, values, (err, data) => {
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
var updateListInEngineeringLists = (model, product, content) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "UPDATE engineering_lists SET content = ? WHERE model = ? AND product = ?";
      const values = [content, model, product];
      await db.query(q, values, (err, data) => {
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
var exsitsListsWithThisModelAndProductInProductionLists = (model, product) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT line FROM production_lists WHERE model = ? AND product = ?";
      const values = [model, product];
      await db.query(q, values, (err, data) => {
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
      await db.query(q, values, (err, data) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exsitsListsWithThisModelAndProductInProductionLists,
  exsitsThisListIEngineeringLists,
  insertListInEngineeringLists,
  updateContentInProductionLists,
  updateListInEngineeringLists
});
