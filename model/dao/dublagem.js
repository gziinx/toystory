/****************************************************************
 * objetivo: Criar a comunicaçao com o banco de dados para fazer o CRUD de dublagem
 * data: 15/04/2025
 * autor: gustavo
 * versao: 1.0
 ****************************************************************/

 //import da biblioteca do prisma
 const {PrismaClient} = require('@prisma/client')


 const prisma = new PrismaClient()

const insertDublagem = async function (idioma){
    try{

    //criar um objeto a ser utilizado a biblioteca do prisma/client

        let sql = `insert into tbl_dublagem (
                                            idioma
                                        )

                                        values
                                        (
                                            '${idioma.idioma}'
                                            
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

 const updateDublagem = async function(idioma){
    try {
        let sql  = `update tbl_dublagem set idioma               = '${idioma.idioma}'
                                          where id             =  ${idioma.id}`

        let resultDublagem = await prisma.$executeRawUnsafe(sql)
        
        if(resultDublagem)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

const deleteDublagem = async function (id){
    try{
        let sql  = `delete from tbl_dublagem where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
        return true
        else
        return false
    }catch(error){
        return false
    }
}

const selectAllDublagem = async function (){
    try{

        
        let sql = 'select * from tbl_dublagem order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
        return result
        else
        return false
    }catch(error){
        return false
    }
}

const selectByIdDublagem = async function (id){

    try{
        let sql  = `select * from tbl_dublagem where id = ${id}`

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
    insertDublagem,
    updateDublagem,
    deleteDublagem,
    selectAllDublagem,
    selectByIdDublagem
}