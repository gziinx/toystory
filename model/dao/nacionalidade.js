/****************************************************************
 * objetivo: Criar a comunicaçao com o banco de dados para fazer o CRUD de nacionalidade
 * data: 15/04/2025
 * autor: gustavo
 * versao: 1.0
 ****************************************************************/

 //import da biblioteca do prisma
 const {PrismaClient} = require('@prisma/client')


 const prisma = new PrismaClient()

const insertNacionalidade = async function (nacionalidade){
    try{

    //criar um objeto a ser utilizado a biblioteca do prisma/client

        let sql = `insert into tbl_nacionalidade (
                                            nacionalidade
                                        )

                                        values
                                        (
                                            '${nacionalidade.nacionalidade}'
                                            
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

 const updateNacionalidade = async function(nacionalidade){
    try {
        let sql  = `update tbl_nacionalidade set nacionalidade               = '${nacionalidade.nacionalidade}'
                                          where id             =  ${nacionalidade.id}`

        let resultFilme = await prisma.$executeRawUnsafe(sql)
        
        if(resultFilme)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

const deleteNacionalidade = async function (id){
    try{
        let sql  = `delete from tbl_nacionalidade where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
        return true
        else
        return false
    }catch(error){
        return false
    }
}

const selectAllNacionalidade = async function (){
    try{

        
        let sql = 'select * from tbl_nacionalidade order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
        return result
        else
        return false
    }catch(error){
        return false
    }
}

const selectByIdNacionalidade = async function (id){

    try{
        let sql  = `select * from tbl_nacionalidade where id = ${id}`

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
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade
}