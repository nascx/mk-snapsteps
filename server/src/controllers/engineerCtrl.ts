import { Request, Response } from "express";

import { convertExcelToJson, convertExcelToJsonWithoutAlterLine } from '../commonFunctions/convertExcelToJson'

import path from 'node:path'

import fs from 'node:fs'

import {
    exsitsThisListIEngineeringLists,
    exsitsListsWithThisModelAndProductInProductionLists,
    insertListInEngineeringLists,
    updateContentInProductionLists,
    updateListInEngineeringLists
} from "../models/engineer";

export const createList = async (req: Request, res: Response) => {
    try {
        console.log('Função chamada!')
        // prgando o caminho do arquivo que foi enviado
        const filePath: string = path.join(__dirname, `/00_engineering_lists/${req.file?.originalname}`)
        // convertendo o conteúdo do arquivo em json
        const jsonData = convertExcelToJsonWithoutAlterLine(filePath)
        // pegando o modelo desse conteúdo
        const model: string = jsonData?.model ?? 'error'
        // pegando o produto desse conteúdo
        const product: string = jsonData?.product ?? 'error'
        // pegando o conteúdo de instruções
        const content: string = jsonData?.content ?? 'error'
        //pegando o conteúdo da linha
        const line: string = jsonData?.line ?? 'error'
        // procurando se existe uma lista na tabela de listas de engenharia com esse modelo e produto
        const existListEng = await exsitsThisListIEngineeringLists(model as string, product as string)
        if (existListEng) {
            // se já existir deve ser atualizada
            await updateListInEngineeringLists( model, product, content, line)
        } else {
            // se não deve ser inserida
            await insertListInEngineeringLists( model, product, content, line)
        }
        // procurando se existe já existe uma lista na tabela de lista de produção com modelo e produto
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log('Erro ao excluir o arquivo!')
            }
            console.log('Arquivo excluído com sucesso!')
        })
        res.status(200).json('Operação concluída com sucesso!')
    } catch (error) {
        res.status(500).json(error)
    }
}

// para fazer upload da lista de produção