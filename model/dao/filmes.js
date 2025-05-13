/****************************************************************
 * objetivo: Criar a comunicaçao com o banco de dados para fazer o CRUD de filmes
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0
 ****************************************************************/

 //import da biblioteca do prisma
 const { PrismaClient } = require('@prisma/cliente')

 const insertFilme = async function (){

    //criar um objeto a ser utilizado a biblioteca do prisma/client
        const prisma = new PrismaClient()

        let sql = `insert int tbl_filme (nome,
                                        duracao,
                                        sinopse,
                                        data_lancamento,
                                        foto_capa,
                                        link_trailer
           
                                        )

                                        values
                                        (
                                            ${filme.nome},
                                            ${filme.duracao},
                                            ${filme.sinopse},
                                            ${filme.data_lancamento},.66
                                            ${filme.foto_capa},
                                            ${filme.link.trailer},
                                            
                                        )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
        return true
        else
        return false
 }

 const updateFilme = async function(){

 }

const deleteFilme = async function (){

}

const selectAllFilme = async function (){

}

const selectByIdFilme = async function (){

}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectByIdFilme

    
}