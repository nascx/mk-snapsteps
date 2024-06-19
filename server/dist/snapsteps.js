"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/snapsteps.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_dotenv2 = require("dotenv");

// src/config/multer.ts
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var storageEngineeringList = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    const filePath = import_path.default.join(__dirname, "../../00_engineering_lists");
    callback(null, filePath);
  },
  filename: function(req, file, callback) {
    const fileName = file.originalname;
    callback(null, `${fileName}`);
  }
});
var uploadEngineeringLists = (0, import_multer.default)({ storage: storageEngineeringList });
var storageProductionList = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    const filePath = import_path.default.join(__dirname, "../../00_production_lists");
    callback(null, filePath);
  },
  filename: function(req, file, callback) {
    const fileName = file.originalname;
    callback(null, `${fileName}`);
  }
});
var uploadProductionListsMulter = (0, import_multer.default)({ storage: storageProductionList });
var storageIT = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    const filePath = import_path.default.join(__dirname, "../../_its");
    callback(null, filePath);
  },
  filename: function(req, file, callback) {
    const fileName = file.originalname;
    callback(null, `${fileName}`);
  }
});
var uploadIT = (0, import_multer.default)({ storage: storageIT });
var storageQuality = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    const filePath = import_path.default.join(__dirname, "../../_quality");
    callback(null, filePath);
  },
  filename: function(req, file, callback) {
    const fileName = file.originalname;
    callback(null, `${fileName}`);
  }
});
var uploadQuality = (0, import_multer.default)({ storage: storageQuality });

// src/commonFunctions/convertExcelToJson.ts
var import_convert_excel_to_json = __toESM(require("convert-excel-to-json"));
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
var import_node_path = __toESM(require("path"));
var import_node_fs = __toESM(require("fs"));

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

// src/commonFunctions/convertJsonToExcel.ts
var import_exceljs = __toESM(require("exceljs"));
var convertJsonToExcel = (jsonData) => {
  const workbook = new import_exceljs.default.Workbook();
  const worksheet = workbook.addWorksheet("1");
  worksheet.getColumn("A").width = 20;
  worksheet.getColumn("B").width = 20;
  worksheet.getColumn("C").width = 20;
  worksheet.getColumn("D").width = 60;
  worksheet.getColumn("E").width = 20;
  worksheet.getColumn("F").width = 20;
  worksheet.getColumn("G").width = 20;
  jsonData.forEach((row) => {
    const rowData = [row.pm, row.page, row.it, row.activity, row.post, row.sequence, row.operations];
    worksheet.addRow(rowData);
  });
  worksheet.getCell("B1").font = { bold: true };
  worksheet.getCell("C1").font = { bold: true };
  worksheet.getCell("D1").font = { bold: true };
  worksheet.getCell("E1").font = { bold: true };
  worksheet.getCell("F1").font = { bold: true };
  worksheet.getCell("G1").font = { bold: true };
  return workbook;
};

// src/controllers/producionCtrl.ts
var import_node_path2 = __toESM(require("path"));
var import_node_fs2 = __toESM(require("fs"));
var downloadList = async (req, res) => {
  try {
    const { model, product, line } = req.query;
    const productionList = await getContentFromProductionList(model, product, line);
    if (productionList.status) {
      const content = productionList.content;
      const workbook = await convertJsonToExcel(content);
      workbook.xlsx.writeBuffer().then((data) => {
        res.setHeader("Content-Disposition", `attachment; filename="1.xlsx"`);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(data);
      });
    } else {
      const engineeringList = await getContentFromEngineeringList(model, product);
      if (engineeringList.status) {
        const content = engineeringList.content;
        const workbook = await convertJsonToExcel(content);
        workbook.xlsx.writeBuffer().then((data) => {
          res.setHeader("Content-Disposition", `attachment; filename="1.xlsx"`);
          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
          res.send(data);
        });
      } else {
        res.status(400).json("N\xE3o existe lista com esse modelo e produto!");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
var getModelAndProductOptions = async (req, res) => {
  try {
    const options = await searchByModelAndProductOptions();
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json(error);
  }
};
var getModelProductOptionsAndLine = async (req, res) => {
  try {
    const options = await searchByModelAndProductOptionsAndLine();
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json(error);
  }
};
var uploadProductionLists = async (req, res) => {
  try {
    const filePath = import_node_path2.default.join(__dirname, `../../00_production_lists/${req.file?.originalname}`);
    const jsonData = convertExcelToJsonWithoutAlterLine(filePath);
    const model = jsonData?.model;
    const product = jsonData?.product;
    const line = jsonData?.line;
    const content = jsonData?.content;
    const existThisListProd = await exsitsThisListInProductionLists(model, product, line);
    if (existThisListProd.status) {
      console.log("J\xE1 exite lista com esse modelo e produto e linha");
      await updateListInProductionLists(model, product, line, content);
    } else {
      console.log("Ainda n\xE3o existe lista com esse modelo produto e linha");
      await saveNewListInProductionLists(model, product, line, content);
    }
    import_node_fs2.default.unlink(filePath, (err) => {
      if (err) {
        console.log("Erro ao excluir o arquivo!");
      }
      console.log("Arquivo exclu\xEDdo com sucesso!");
    });
    res.status(200).json("Opera\xE7\xE3o conclu\xEDda com sucesso!");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
var sendIT = async (req, res) => {
  try {
    const { model, product, line } = req.query;
    const prodList = await exsitsThisListInProductionLists(model, product, line);
    if (prodList.status) {
      const jsonData = JSON.parse(prodList.content);
      const postInfos = {};
      const posts = [];
      jsonData.map((row, i) => {
        if (i > 0) {
          if (!postInfos[row.post]) {
            postInfos[row.post] = [];
            postInfos[row.post].push({ it: row.it, page: Number(row.page) });
            posts.push(String(row.post));
          } else {
            postInfos[row.post].push({ it: row.it, page: Number(row.page) });
          }
        }
      });
      res.status(200).json({ postInfos, posts });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// src/controllers/sgiCtrl.ts
var import_node_path3 = __toESM(require("path"));

// src/models/sgi.ts
var existsThisIT = (path6) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT name FROM its WHERE path = ?";
      await db.query(q, [path6], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          resolve({ status: true });
        } else {
          resolve({ status: false });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var insertIT = (path6, name) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "INSERT INTO its (path, name) VALUES (?, ?)";
      await db.query(q, [path6, name], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data.affectedRows > 0) {
          console.log("Arquivos inserido com sucesso na tabela its", data);
          resolve(true);
        } else {
          console.log("Por algum motivo os dados n\xE3o foram inseridos na tabela de its!");
          reject("Nenhum dado inserido na tabela de its!");
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var existsThisQAFile = (code) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT title FROM qa_files WHERE code = ?";
      await db.query(q, [code], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          resolve({ status: true });
        } else {
          resolve({ status: false });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var insertQAFile = (code, title, path6) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "INSERT INTO qa_files (code, title, path) VALUES (?, ?, ?)";
      await db.query(q, [code, title, path6], (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (data.affectedRows > 0) {
          console.log("Arquivos inserido com sucesso na tabela arquivos do qa", data);
          resolve(true);
        } else {
          console.log("Por algum motivo os dados n\xE3o foram inseridos na tabela de arquivos do qa!");
          reject("Nenhum dado inserido na tabela de its!");
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// src/controllers/sgiCtrl.ts
var import_node_fs3 = __toESM(require("fs"));
var pdf2excel = require("pdf-to-excel");
var excel2json2 = require("convert-excel-to-json");
function removeFileExtension(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}
var handleUploadIT = async (req, res) => {
  try {
    const name = removeFileExtension(req?.file?.filename);
    const filePath = import_node_path3.default.join(__dirname, `../../_its/${req.file?.originalname}`);
    const it = await existsThisIT(filePath);
    if (!it.status) {
      await insertIT(filePath, name);
    } else {
      console.log("Arquivo j\xE1 est\xE1 salvo na base de dados!");
    }
    res.status(200).json("Dados salvos!");
  } catch (error) {
    res.status(500).json(error);
  }
};
var getInfosFromQAFile = async (filePath, excelPath) => {
  await pdf2excel.genXlsx(filePath, excelPath);
  const json = await excel2json2({ sourceFile: excelPath, header: { rows: 1 } });
  const jsonInfos = json.Sheet1;
  const titleJson = jsonInfos[1];
  let title = "";
  let count = 0;
  for (let key in titleJson) {
    if (count > 2) {
      title += titleJson[key];
    }
    count++;
  }
  const codeJson = jsonInfos[5];
  let code = "";
  let i = 0;
  for (let key in codeJson) {
    if (codeJson[key] === "C\xD3DIGO:") {
      let index = 0;
      for (let key2 in codeJson) {
        if (index === i + 2) {
          code = codeJson[key2];
        }
        index++;
      }
    }
    i++;
  }
  return { code, title };
};
var handleUploadQualityFile = async (req, res) => {
  try {
    const orginalPath = import_node_path3.default.join(__dirname, `../../_quality/${req.file?.originalname}`);
    const excelPath = import_node_path3.default.join(__dirname, `../../_excels/${"teste.xlsx"}`);
    const { code, title } = await getInfosFromQAFile(orginalPath, excelPath);
    const qaFile = await existsThisQAFile(code);
    const filePath = import_node_path3.default.join(__dirname, `../../_quality/${code}.pdf`);
    import_node_fs3.default.renameSync(orginalPath, filePath);
    if (qaFile.status) {
      console.log("J\xE1 existe IT do QA com esse c\xF3digo");
    } else {
      await insertQAFile(code, title, filePath);
    }
    import_node_fs3.default.unlinkSync(excelPath);
    res.status(200).json({ code, title });
  } catch (error) {
    res.status(500).json(error);
  }
};

// src/views/sendCompletePdf.ts
var import_pdf_lib4 = require("pdf-lib");

// src/views/generateCover.ts
var import_pdf_lib = require("pdf-lib");
var generateCover = async (post) => {
  const pdfDoc = await import_pdf_lib.PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const font = await pdfDoc.embedFont(import_pdf_lib.StandardFonts.CourierBold);
  const fontSize = 80;
  const { width, height } = page.getSize();
  const textWidth = font.widthOfTextAtSize(`Posto ${post}`, fontSize);
  const textHeight = fontSize;
  const x = (width - textWidth) / 2;
  const y = (height - textHeight) / 2;
  page.drawText(`Grupo MK`, {
    x,
    y: 510,
    size: 60,
    font
  });
  page.drawText(`Posto ${post}`, {
    x,
    y,
    size: fontSize,
    font
  });
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

// src/views/getPage.ts
var import_pdf_lib2 = require("pdf-lib");
var import_node_path4 = __toESM(require("path"));
var import_node_fs4 = __toESM(require("fs"));
var getPage = async (it, pageNumber) => {
  try {
    const ITpath = import_node_path4.default.resolve(__dirname, `../../_its/${it}.pdf`);
    const pdfBuffer = import_node_fs4.default.readFileSync(ITpath);
    const pdfDoc = await import_pdf_lib2.PDFDocument.load(pdfBuffer);
    const newPdfDoc = await import_pdf_lib2.PDFDocument.create();
    const [page] = await newPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
    await newPdfDoc.addPage(page);
    const pdfBytes = await newPdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw error;
  }
};

// src/views/generateObs.ts
var import_pdf_lib3 = require("pdf-lib");
var generateObs = async (operations) => {
  const pdfDoc = await import_pdf_lib3.PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const font = await pdfDoc.embedFont(import_pdf_lib3.StandardFonts.CourierBold);
  const fontSize = 35;
  const { width, height } = page.getSize();
  const textHeight = fontSize;
  page.drawText(`Na p\xE1gina abaixo vide:`, {
    x: 200,
    y: 400,
    size: fontSize,
    font
  });
  page.drawText(`Opera\xE7\xF5es: ${operations}`, {
    x: 842 / 6,
    y: 595 / 2,
    size: fontSize,
    font
  });
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

// src/views/sendCompletePdf.ts
var sendPdf = async (req, res) => {
  try {
    const { model, product, line } = req.query;
    const content = await exsitsThisListInProductionLists(model, product, line);
    if (content.status) {
      const jsonData = JSON.parse(content.content);
      const postsContent = {};
      const postsUseds = [];
      jsonData.forEach((element, i) => {
        if (i > 0) {
          if (postsContent[element.post]) {
            postsContent[element.post].push({ it: element.it, page: element.page, operations: element.operations ?? "" });
          } else {
            postsContent[element.post] = [{ it: element.it, page: element.page, operations: element.operations ?? "" }];
            postsUseds.push(String(element.post));
          }
        }
      });
      const newPdfDoc = await import_pdf_lib4.PDFDocument.create();
      console.log(postsUseds);
      for (const post of postsUseds) {
        console.log(post);
        const pdfBytes = await generateCover(post);
        const existingPdfDoc = await import_pdf_lib4.PDFDocument.load(pdfBytes);
        const [existingPage] = await newPdfDoc.copyPages(existingPdfDoc, [0]);
        newPdfDoc.addPage(existingPage);
        const pdf2 = postsContent[post];
        console.log("Gerou posto", post);
        for (const el of pdf2) {
          console.log("pegando p\xE1gina");
          console.log(el.it, el.page);
          if (el.operations !== "") {
            const pdfBytesCover = await generateObs(el.operations);
            const existingPdfDoc3 = await import_pdf_lib4.PDFDocument.load(pdfBytesCover);
            const [existingPage3] = await newPdfDoc.copyPages(existingPdfDoc3, [0]);
            newPdfDoc.addPage(existingPage3);
          }
          const pdfBytes2 = await getPage(el.it, el.page);
          const existingPdfDoc2 = await import_pdf_lib4.PDFDocument.load(pdfBytes2);
          const [existingPage2] = await newPdfDoc.copyPages(existingPdfDoc2, [0]);
          newPdfDoc.addPage(existingPage2);
          console.log("p\xE1gina gerada", el.page, el.it);
        }
      }
      const pdf = await newPdfDoc.save();
      console.log("finalizou");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=extracted_page.pdf");
      res.send(Buffer.from(pdf));
    } else {
      res.status(404).send("Conte\xFAdo n\xE3o encontrado.");
    }
  } catch (error) {
    console.error("Erro ao processar o PDF:", error);
    res.status(500).send("Erro ao processar o PDF.");
  }
};

// src/views/sendPDfByPost.ts
var import_pdf_lib5 = require("pdf-lib");
var sendPdfByPost = async (req, res) => {
  try {
    const { model, product, line, post } = req.query;
    const content = await exsitsThisListInProductionLists(model, product, line);
    if (content.status) {
      const jsonData = JSON.parse(content.content);
      const postsContent = {};
      const postsUseds = [post];
      jsonData.forEach((element, i) => {
        if (i > 0) {
          if (postsContent[element.post]) {
            postsContent[element.post].push({ it: element.it, page: element.page, operations: element.operations ?? "" });
          } else {
            postsContent[element.post] = [{ it: element.it, page: element.page, operations: element.operations ?? "" }];
          }
        }
      });
      const newPdfDoc = await import_pdf_lib5.PDFDocument.create();
      for (const post2 of postsUseds) {
        const pdfBytes = await generateCover(post2);
        const existingPdfDoc = await import_pdf_lib5.PDFDocument.load(pdfBytes);
        const [existingPage] = await newPdfDoc.copyPages(existingPdfDoc, [0]);
        newPdfDoc.addPage(existingPage);
        const pdf2 = postsContent[post2];
        for (const el of pdf2) {
          if (el.operations !== "") {
            const pdfBytesCover = await generateObs(el.operations);
            const existingPdfDoc3 = await import_pdf_lib5.PDFDocument.load(pdfBytesCover);
            const [existingPage3] = await newPdfDoc.copyPages(existingPdfDoc3, [0]);
            newPdfDoc.addPage(existingPage3);
          }
          const pdfBytes2 = await getPage(el.it, el.page);
          const existingPdfDoc2 = await import_pdf_lib5.PDFDocument.load(pdfBytes2);
          const [existingPage2] = await newPdfDoc.copyPages(existingPdfDoc2, [0]);
          newPdfDoc.addPage(existingPage2);
        }
      }
      const pdf = await newPdfDoc.save();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=extracted_page.pdf");
      res.send(Buffer.from(pdf));
    } else {
      res.status(404).send("Conte\xFAdo n\xE3o encontrado.");
    }
  } catch (error) {
    console.error("Erro ao processar o PDF:", error);
    res.status(500).send("Erro ao processar o PDF.");
  }
};

// src/models/quality.ts
var searchQAFiles = (value) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT code, title, path FROM qa_files WHERE code LIKE ? OR title LIKE ?";
      await db.query(q, [`%${value}%`, `%${value}%`], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          resolve(data);
        } else {
          resolve([]);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// src/controllers/qaCtrl.ts
var sendQAFilesOptions = async (req, res) => {
  try {
    const { value } = req.query;
    console.log(value);
    const data = await searchQAFiles(value);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// src/views/sendQAfile.ts
var import_node_fs5 = __toESM(require("fs"));
var sendQAFile = async (req, res) => {
  try {
    const { path: path6 } = req.query;
    const bytes = import_node_fs5.default.readFileSync(path6);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=extracted_page.pdf");
    res.send(Buffer.from(bytes));
  } catch (error) {
    res.status(400).json(error);
  }
};

// src/models/auth.ts
var getPassword = async (sector) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT password FROM users WHERE sector = ?";
      await db.query(q, [sector], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          resolve({ status: true, message: data[0].password });
        } else {
          resolve({ status: false, message: "Este setor n\xE3o existe!" });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// src/controllers/authCtrl.ts
var credentialCheck = async (req, res) => {
  try {
    const { sector, password } = req.query;
    const crendials = await getPassword(sector);
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

// src/snapsteps.ts
(0, import_dotenv2.config)();
var snapsteps = (0, import_express.default)();
snapsteps.use(import_express.default.json());
snapsteps.use((0, import_cors.default)());
snapsteps.post("/eng/list-upload", uploadEngineeringLists.single("list"), createList);
snapsteps.get("/prod/download-list", downloadList);
snapsteps.get("/get-model-and-product-options", getModelAndProductOptions);
snapsteps.post("/production/upload-file", uploadProductionListsMulter.single("prod-list"), uploadProductionLists);
snapsteps.post("/sgi/upload-it", uploadIT.single("it"), handleUploadIT);
snapsteps.get("/production/download-it", sendIT);
snapsteps.get("/production/get-options-to-pdf", getModelProductOptionsAndLine);
snapsteps.get("/pdf", sendPdf);
snapsteps.get("/pdf-by-post", sendPdfByPost);
snapsteps.post("/sgi/upload-quality-file", uploadQuality.single("quality"), handleUploadQualityFile);
snapsteps.get("/qa/get-files", sendQAFilesOptions);
snapsteps.get("/qa/view-it", sendQAFile);
snapsteps.get("/auth", credentialCheck);
var port = process.env.PORT;
snapsteps.listen(port, () => {
  console.log("Server listen in ", port, "port");
});
