import multer from 'multer'

import path from 'path'


// para salvar as listas de engenharia
const storageEngineeringList = multer.diskStorage({
    destination: (req, file, callback) => {
        const filePath : string = path.resolve(__dirname, '../../00_engineering_lists')
        callback(null, filePath)
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname
        callback(null, `${fileName}`)
    },
})

export const uploadEngineeringLists = multer( { storage : storageEngineeringList })

// para salvar as listas de produção
const storageProductionList = multer.diskStorage({
    destination: (req, file, callback) => {
        const filePath : string = path.resolve(__dirname, '../../00_production_lists')
        callback(null, filePath)
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname
        callback(null, `${fileName}`)
    },
})

export const uploadProductionListsMulter = multer( { storage : storageProductionList })

// para salvar as IT'S
const storageIT = multer.diskStorage({
    destination: (req, file, callback) => {
        const filePath : string = path.resolve(__dirname, '../../_its')
        callback(null, filePath)
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname
        callback(null, `${fileName}`)
    },
})

export const uploadIT = multer( { storage : storageIT })

// Para salvar os arquivos da qualidade
const storageQuality = multer.diskStorage({
    destination: (req, file, callback) => {
        const filePath : string = path.resolve(__dirname, '../../_quality')
        callback(null, filePath)
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname
        callback(null, `${fileName}`)
    },
})

export const uploadQuality = multer( { storage : storageQuality })