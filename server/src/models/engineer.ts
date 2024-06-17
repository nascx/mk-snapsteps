import { db } from "../config/db"

// para procurar se já existe uma lista na tabela de listas da engenharia
export const exsitsThisListIEngineeringLists = (model: string, product: string) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT id FROM engineering_lists WHERE model = ? AND product = ?'
            const values = [model, product]
            await db.query(q, values, (err, data) => {
                if (err) {
                    console.log('Erro ao fazer consulta se existe está lista na lista de engenharia!', err)
                    reject(err)
                }
                if (data && data.length > 0) {
                    resolve(true)
                } else {
                    console.log('Nada encontrado na busca se existe está lista na lista de engenharia!')
                    resolve(false)
                }
            })
        })
    } catch (error) {
        throw error
    }
}

// para inserir uma lista na tabela de listas da engenharia
export const insertListInEngineeringLists = ( model: string, product: string, content: string) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'INSERT INTO engineering_lists ( model, product, content) VALUES (?, ?, ?)'
            const values = [ model, product, content]
            await db.query(q, values, (err, data) => {
                if (err) {
                    console.log('Erro ao inserir uma lista na tabela de listas da engenharia!', err)
                    reject(err)
                }
                if (data && data.affectedRows > 0) {
                    console.log('Arquivos inseridos com sucesso', data)
                    resolve(true)
                } else {
                    console.log('Por algum motivo os dados não foram inseridos!')
                    reject('Nenhum dado inserido na tabela de lista de engenharia!')
                }
            })
        })
    } catch (error) {
        throw error
    }
}

// para atualizar os dados de uma lista que está na tabela de listas de engenharia 
export const updateListInEngineeringLists = ( model: string, product: string, content: string) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'UPDATE engineering_lists SET content = ? WHERE model = ? AND product = ?'
            const values = [content, model, product]
            await db.query(q, values, (err, data) => {
                if (err) {
                    console.log('Erro ao atualizar uma lista na tabela de listas da engenharia!', err)
                    reject(err)
                }
                if (data.affectedRows > 0) {
                    console.log('Arquivos atualizados com sucesso', data)
                    resolve(true)
                } else {
                    console.log('Por algum motivo os dados não foram atualizados!')
                    reject('Nenhum dado atualizado na tabela de lista de engenharia!')
                }
            })
        })
    } catch (error) {
        throw error
    }
}

// para procurar se existe uma lista com model e produto iguai na tabela de listas de produção
export const exsitsListsWithThisModelAndProductInProductionLists = (model: string, product: string) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT line FROM production_lists WHERE model = ? AND product = ?'
            const values = [model, product]
            await db.query(q, values, (err, data) => {
                if (err) {
                    console.log('Erro ao buscar por lista bna tabela de lista de produção!')
                    reject(err)
                }
                if (data && data.length > 0) {
                    console.log('Existe listas na tabela de listas de engenharia que usam esse modelo e produto')
                    resolve({ status: true, content: data })
                } else {
                    resolve({ status: false, content: [] })
                }
            })
        })
    } catch (error) {
        throw error
    }
}

// para atualizar as listas com na tabela de listas de produção
export const updateContentInProductionLists = (content: string, model: string, product: string, line: string) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'UPDATE production_lists SET content = ? WHERE model = ? AND product = ? AND line = ?'
            const values = [content, model, product, line]
            await db.query(q, values, (err, data) => {
                if (err) {
                    console.log(`Erro ao atualizar o conteúdo: ${model}-${product}-${line}`)
                    reject(err)
                }
                if (data.affectedRows > 0) {
                    console.log('Dados de lista de produção atualizados')
                    resolve(true)
                } else {
                    console.log('Por algum motivo o conteúdo da lista de produção não foi atualizado!')
                }
            })
        })
    } catch (error) {
        throw error
    }

}