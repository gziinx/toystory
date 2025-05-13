/****************************************************************
 * objetivo: Criar a comunicaçao com o banco de dados para fazer o CRUD de dublagem
 * data: 15/04/2025
 * autor: gustavo
 * versao: 1.0
 ****************************************************************/

 //import da biblioteca do prisma
 const {PrismaClient} = require('@prisma/client')


 const prisma = new PrismaClient()

const insertLegenda = async function (idioma){
    try{

    //criar um objeto a ser utilizado a biblioteca do prisma/client

        let sql = `insert into tbl_legenda (
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

 const updateLegenda = async function(idioma){
    try {
        let sql  = `update tbl_legenda set idioma               = '${idioma.idioma}'
                                          where id             =  ${idioma.id}`

        let resultLegenda = await prisma.$executeRawUnsafe(sql)
        
        if(resultLegenda)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

const deleteLegenda = async function (id){
    try{
        let sql  = `delete from tbl_legenda where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
        return true
        else
        return false
    }catch(error){
        return false
    }
}

const selectAllLegenda = async function (){
    try{

        
        let sql = 'select * from tbl_legenda order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
        return result
        else
        return false
    }catch(error){
        return false
    }
}

const selectByIdLegenda = async function (id){

    try{
        let sql  = `select * from tbl_legenda where id = ${id}`

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
    insertLegenda,
    updateLegenda,
    deleteLegenda,
    selectAllLegenda,
    selectByIdLegenda
}