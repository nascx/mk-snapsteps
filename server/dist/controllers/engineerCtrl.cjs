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

// src/controllers/engineerCtrl.ts
var engineerCtrl_exports = {};
__export(engineerCtrl_exports, {
  createList: () => createList
});
module.exports = __toCommonJS(engineerCtrl_exports);

// src/commonFunctions/convertExcelToJson.ts
var import_convert_excel_to_json = __toESM(require("convert-excel-to-json"), 1);
var convertExcelToJson = (listPath, line) => {
  try {
    const result = (0, import_convert_excel_to_json.default)(
      {
        sourceFile: listPath,
        sheets: [{
          name: "1",
          columnToKey: {
            A: "pm",
            B: "page",
            C: "it",
            D: "activity",
            E: "post",
            F: "sequence",
            G: "operations"
          }
        }]
      }
    );
    const jsonData = result["1"];
    const model = jsonData[0].pm;
    const product = jsonData[1].pm;
    jsonData[2].pm = line;
    const content = JSON.stringify(jsonData);
    return { model, product, content, line };
  } catch (error) {
    console.log({ message: "Error to convert excel to json", errorMessage: error });
  }
};
var convertExcelToJsonWithoutAlterLine = (listPath) => {
  try {
    const result = (0, import_convert_excel_to_json.default)(
      {
        sourceFile: listPath,
        sheets: [{
          name: "1",
          columnToKey: {
            A: "pm",
            B: "page",
            C: "it",
            D: "activity",
            E: "post",
            F: "sequence",
            G: "operations"
          }
        }]
      }
    );
    const jsonData = result["1"];
    const model = jsonData[0].pm;
    const product = jsonData[1].pm;
    const line = jsonData[2].pm;
    const content = JSON.stringify(jsonData);
    return { model, product, content, line };
  } catch (error) {
    console.log({ message: "Error to convert excel to json", errorMessage: error });
  }
};

// src/controllers/engineerCtrl.ts
var import_node_path = __toESM(require("path"), 1);
var import_node_fs = __toESM(require("fs"), 1);

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

// src/controllers/engineerCtrl.ts
var createList = async (req, res) => {
  try {
    console.log("Fun\xE7\xE3o chamada!");
    const filePath = import_node_path.default.join(__dirname, `../../00_engineering_lists/${req.file?.originalname}`);
    const jsonData = convertExcelToJsonWithoutAlterLine(filePath);
    const model = jsonData?.model ?? "error";
    const product = jsonData?.product ?? "error";
    const content = jsonData?.content ?? "error";
    const line = jsonData?.line ?? "error";
    const existListEng = await exsitsThisListIEngineeringLists(model, product);
    if (existListEng) {
      await updateListInEngineeringLists(model, product, content);
    } else {
      await insertListInEngineeringLists(model, product, content);
    }
    const existListProd = await exsitsListsWithThisModelAndProductInProductionLists(model, product);
    if (existListProd.status) {
      existListProd.content.forEach((list) => {
        const json = convertExcelToJson(filePath, list.line);
        updateContentInProductionLists(json?.content, model, product, list.line);
      });
    } else {
      console.log(existListProd);
    }
    import_node_fs.default.unlink(filePath, (err) => {
      if (err) {
        console.log("Erro ao excluir o arquivo!");
      }
      console.log("Arquivo exclu\xEDdo com sucesso!");
    });
    res.status(200).json("Opera\xE7\xE3o conclu\xEDda com sucesso!");
  } catch (error) {
    res.status(500).json(error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createList
});
