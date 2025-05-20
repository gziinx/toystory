/****************************************************************
 * objetivo: Criar a comunicaçao com o banco de dados para fazer o CRUD de filmes
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0
 ****************************************************************/

//import da biblioteca do prisma
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const insertFilme = async function (filme) {
    try {

        //criar um objeto a ser utilizado a biblioteca do prisma/client

        let sql = `insert into tbl_filme (nome,
                                        duracao,
                                        sinopse,
                                        data_lancamento,
                                        foto_capa,
                                        link_trailer,
                                        id_classificacao

                                        )

                                        values
                                        (
                                            '${filme.nome}',
                                            '${filme.duracao}',
                                            '${filme.sinopse}',
                                            '${filme.data_lancamento}',
                                            '${filme.foto_capa}',
                                            '${filme.link_trailer}',
                                            '${filme.id_classificacao}'
                                            
                                        )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}



const updateFilme = async function (filme) {
    try {
        let sql = `update tbl_filme set nome               = '${filme.nome}',
                                        duracao             = '${filme.duracao}',
                                        sinopse             = '${filme.sinopse}',
                                        data_lancamento     = '${filme.data_lancamento}',
                                        foto_capa           = '${filme.foto_capa}', 
                                        link_trailer        = '${filme.link_trailer}',
                                        id_classificacao    = '${filme.id_classificacao}'
                                        where id = ${filme.id}`

        let resultFilme = await prisma.$executeRawUnsafe(sql)

        if (resultFilme)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteFilme = async function (id) {
    try {
        let sql = `delete from tbl_filme where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllFilme = async function () {
    try {


        let sql = 'select * from tbl_filme order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdFilme = async function (id) {

    try {
        let sql = `select * from tbl_filme where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectByIdFilme


}