/****************************************************************
 * objetivo: Criar a comunicaçao com o banco de dados para fazer o CRUD de genero
 * data: 15/04/2025
 * autor: gustavo
 * versao: 1.0
 ****************************************************************/

 //import da biblioteca do prisma
 const {PrismaClient} = require('@prisma/client')


 const prisma = new PrismaClient()

const insertGenero = async function (genero){
    try{

    //criar um objeto a ser utilizado a biblioteca do prisma/client

        let sql = `insert into tbl_genero (
                                            genero
                                        )

                                        values
                                        (
                                            '${genero.genero}'
                                            
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

 const updateGenero = async function(genero){
    try {
        let sql  = `update tbl_genero set genero               = '${genero.genero}'
                                          where id             =  ${genero.id}`

        let resultFilme = await prisma.$executeRawUnsafe(sql)
        
        if(resultFilme)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

const deleteGenero = async function (id){
    try{
        let sql  = `delete from tbl_genero where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
        return true
        else
        return false
    }catch(error){
        return false
    }
}

const selectAllGenero = async function (){
    try{

        
        let sql = 'select * from tbl_genero order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
        return result
        else
        return false
    }catch(error){
        return false
    }
}

const selectByIdGenero = async function (id){

    try{
        let sql  = `select * from tbl_genero where id = ${id}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}