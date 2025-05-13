/****************************************************************
 * objetivo: Criar a comunicaçao com o banco de dados para fazer o CRUD de Premiaçao
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0
 ****************************************************************/

 //import da biblioteca do prisma
 const {PrismaClient} = require('@prisma/client')


 const prisma = new PrismaClient()

 const insertPremiacao = async function (premiacao){
    try{

    //criar um objeto a ser utilizado a biblioteca do prisma/client

        let sql = `insert into tbl_premiacao (nome,
                                          tipo
                                        )

                                        values
                                        (
                                            '${premiacao.nome}',
                                            '${premiacao.tipo}'
                                           )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
        return true
        else
        return false
    }catch(error){
        return false
    }

    }

 

 const updatePremiacao = async function(premiacao){
    try {
        let sql  = `update tbl_premiacao set nome               = '${premiacao.nome}',
                                             tipo             = '${premiacao.tipo}'
                                        where id            = ${premiacao.id}`

        let resultPremiacao = await prisma.$executeRawUnsafe(sql)
        
        if(resultPremiacao)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

const deletePremiacao = async function (id){
    try{
        let sql  = `delete from tbl_premiacao where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
        return true
        else
        return false
    }catch(error){
        return false
    }
}

const selectAllPremiacao = async function (){
    try{

        
        let sql = 'select * from tbl_premiacao order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
        return result
        else
        return false
    }catch(error){
        return false
    }
}

const selectByIdPremiacao = async function (id){

    try{
        let sql  = `select * from tbl_premiacao where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
        return result
        else
        return false
    }catch(error){
        return false
    }

}

module.exports = {
    insertPremiacao,
    updatePremiacao,
    deletePremiacao,
    selectAllPremiacao,
    selectByIdPremiacao

    
}