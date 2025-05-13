/****************************************************************
 * objetivo: Criar a comunicaçao com o banco de dados para fazer o CRUD de Premiaçao
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0
 ****************************************************************/

 //import da biblioteca do prisma
 const {PrismaClient} = require('@prisma/client')


 const prisma = new PrismaClient()

 const insertUsuario = async function (usuario){
    try{

    //criar um objeto a ser utilizado a biblioteca do prisma/client

        let sql = `insert into tbl_usuario (nome,
                                          email
                                        )

                                        values
                                        (
                                            '${premiacao.nome}',
                                            '${premiacao.email}'
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

 

 const updateUsuario = async function(usuario){
    try {
        let sql  = `update tbl_usuario set nome               = '${usuario.nome}',
                                             tipo             = '${usuario.email}'
                                        where id            = ${usuario.id}`

        let resultUsuario = await prisma.$executeRawUnsafe(sql)
        
        if(resultUsuario)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

const deleteUsuario = async function (id){
    try{
        let sql  = `delete from tbl_usuario where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
        return true
        else
        return false
    }catch(error){
        return false
    }
}

const selectAllUsuario = async function (){
    try{

        
        let sql = 'select * from tbl_usuario order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
        return result
        else
        return false
    }catch(error){
        return false
    }
}

const selectByIdUsuario = async function (id){

    try{
        let sql  = `select * from tbl_usuario where id = ${id}`

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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario

    
}