/****************************************************************
 * objetivo: Criar a comunicaçao com o banco de dados para fazer o CRUD de sexualidade
 * data: 15/04/2025
 * autor: gustavo
 * versao: 1.0
 ****************************************************************/

 //import da biblioteca do prisma
 const {PrismaClient} = require('@prisma/client')


 const prisma = new PrismaClient()

const insertSexo = async function (sexo){
    try{

    //criar um objeto a ser utilizado a biblioteca do prisma/client

        let sql = `insert into tbl_sexo (
                                            sexo
                                        )

                                        values
                                        (
                                            '${sexo.sexo}'
                                            
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

 const updateSexo = async function(sexo){
    try {
        let sql  = `update tbl_sexo set sexo              = '${sexo.sexo}'
                                          where id             =  ${sexo.id}`

        let resultSexo = await prisma.$executeRawUnsafe(sql)
        
        if(resultSexo)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

const deleteSexo = async function (id){
    try{
        let sql  = `delete from tbl_sexo where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
        return true
        else
        return false
    }catch(error){
        return false
    }
}

const selectAllSexo = async function (){
    try{

        
        let sql = 'select * from tbl_sexo order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
        return result
        else
        return false
    }catch(error){
        return false
    }
}

const selectByIdSexo = async function (id){

    try{
        let sql  = `select * from tbl_sexo where id = ${id}`

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
    insertSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selectByIdSexo
}