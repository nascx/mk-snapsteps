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

// src/models/production.ts
var production_exports = {};
__export(production_exports, {
  exsitsThisListInProductionLists: () => exsitsThisListInProductionLists,
  getContentFromEngineeringList: () => getContentFromEngineeringList,
  getContentFromProductionList: () => getContentFromProductionList,
  saveNewListInProductionLists: () => saveNewListInProductionLists,
  searchByModelAndProductOptions: () => searchByModelAndProductOptions,
  searchByModelAndProductOptionsAndLine: () => searchByModelAndProductOptionsAndLine,
  updateListInProductionLists: () => updateListInProductionLists
});
module.exports = __toCommonJS(production_exports);

// src/config/db.ts
var import_mysql = __toESM(require("mysql"), 1);
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var db = import_mysql.default.createConnection({
  host: process.env.DB_HOST || "10.12.100.14",
  user: process.env.DB_USER || "sysweb",
  database: process.env.DB_DATABASE || "snapsteps",
  password: process.env.DB_PASSWORD || "ZqkNUCy9DnPjGuSG"
});

// src/models/production.ts
var getContentFromProductionList = async (model, product, line) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT content FROM production_lists WHERE model = ? AND product = ? AND line = ?";
      await db.query(q, [model, product, line], (err, data) => {
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
var getContentFromEngineeringList = async (model, product) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT content FROM engineering_lists WHERE model = ? AND product = ?";
      await db.query(q, [model, product], (err, data) => {
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
var searchByModelAndProductOptions = async () => {
  try {
    const q = "SELECT model, product FROM engineering_lists";
    return new Promise(async (resolve, reject) => {
      await db.query(q, (err, data) => {
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
var searchByModelAndProductOptionsAndLine = async () => {
  try {
    const q = "SELECT model, product, line FROM production_lists";
    return new Promise(async (resolve, reject) => {
      await db.query(q, (err, data) => {
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
          const lines = data.map((row) => {
            return { label: row.line, value: row.line };
          });
          resolve({ models, products, lines });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var exsitsThisListInProductionLists = (model, product, line) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT content FROM production_lists WHERE model = ? AND product = ? AND line = ?";
      const values = [model, product, line];
      await db.query(q, values, (err, data) => {
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
var saveNewListInProductionLists = async (model, product, line, content) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "INSERT INTO production_lists (model, product, line, content) VALUES (?, ?, ?, ?)";
      await db.query(q, [model, product, line, content], (err, data) => {
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
var updateListInProductionLists = (model, product, line, content) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "UPDATE production_lists SET content = ? WHERE model = ? AND product = ? AND line = ?";
      const values = [content, model, product, line];
      await db.query(q, values, (err, data) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exsitsThisListInProductionLists,
  getContentFromEngineeringList,
  getContentFromProductionList,
  saveNewListInProductionLists,
  searchByModelAndProductOptions,
  searchByModelAndProductOptionsAndLine,
  updateListInProductionLists
});
