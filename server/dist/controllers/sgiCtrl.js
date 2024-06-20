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

// src/controllers/sgiCtrl.ts
var sgiCtrl_exports = {};
__export(sgiCtrl_exports, {
  handleUploadIT: () => handleUploadIT,
  handleUploadQualityFile: () => handleUploadQualityFile
});
module.exports = __toCommonJS(sgiCtrl_exports);
var import_node_path = __toESM(require("path"));

// src/config/db.ts
var import_mysql = __toESM(require("mysql"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var db = import_mysql.default.createConnection({
  host: process.env.DB_HOST || "10.12.100.14",
  user: process.env.DB_USER || "sysweb",
  database: process.env.DB_DATABASE || "snapsteps",
  password: process.env.DB_PASSWORD || "ZqkNUCy9DnPjGuSG"
});

// src/models/sgi.ts
var existsThisIT = (path2) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT name FROM its WHERE path = ?";
      await db.query(q, [path2], (err, data) => {
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
var insertIT = (path2, name) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "INSERT INTO its (path, name) VALUES (?, ?)";
      await db.query(q, [path2, name], (err, data) => {
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
var insertQAFile = (code, title, path2) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "INSERT INTO qa_files (code, title, path) VALUES (?, ?, ?)";
      await db.query(q, [code, title, path2], (err, data) => {
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
var import_node_fs = __toESM(require("fs"));
var pdf2excel = require("pdf-to-excel");
var excel2json = require("convert-excel-to-json");
function removeFileExtension(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}
var handleUploadIT = async (req, res) => {
  try {
    const name = removeFileExtension(req?.file?.filename);
    const filePath = import_node_path.default.join(__dirname, `../_its/${req.file?.originalname}`);
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
  const json = await excel2json({ sourceFile: excelPath, header: { rows: 1 } });
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
    const orginalPath = import_node_path.default.join(__dirname, `../_quality/${req.file?.originalname}`);
    const excelPath = import_node_path.default.join(__dirname, `../_excels/${"teste.xlsx"}`);
    const { code, title } = await getInfosFromQAFile(orginalPath, excelPath);
    const qaFile = await existsThisQAFile(code);
    const filePath = import_node_path.default.join(__dirname, `../_quality/${code}.pdf`);
    import_node_fs.default.renameSync(orginalPath, filePath);
    if (qaFile.status) {
      console.log("J\xE1 existe IT do QA com esse c\xF3digo");
    } else {
      await insertQAFile(code, title, filePath);
    }
    import_node_fs.default.unlinkSync(excelPath);
    res.status(200).json({ code, title });
  } catch (error) {
    res.status(500).json(error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleUploadIT,
  handleUploadQualityFile
});
