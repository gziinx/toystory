/****************************************************************
 * objetivo: Criar a comunicaçao com o banco de dados para fazer o CRUD de Premiaçao
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0
 ****************************************************************/

 //import da biblioteca do prisma
 const {PrismaClient} = require('@prisma/client')


 const prisma = new PrismaClient()

 const insertClassificacao = async function (classificacao){
    try {
        let sql = `insert into tbl_classificacao (
                                                    idade_minima,
                                                    link_icon
                   ) values (
                        '${classificacao.idade_minima}',
                        '${classificacao.link_icon}'
                   )`

        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch(error) {
        console.error(error) // <---- LOG DO ERRO AJUDA
        return false
    }
}

 

 const updateClassificacao = async function(classificacao){
    try {
        let sql  = `update tbl_classificacao set idade_minima               = '${classificacao.idade_minima}',
                                             link_icon             = '${classificacao.link_icon}'
                                        where id           = ${classificacao.id}`

        let resultClassificacao = await prisma.$executeRawUnsafe(sql)
        
        if(resultClassificacao)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

const deleteClassificacao = async function (id){
    try{
        let sql  = `delete from tbl_classificacao where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
        return true
        else
        return false
    }catch(error){
        return false
    }
}

const selectAllClassificacao = async function(){

    try {
      
      let sql = 'select * from tbl_classificacao order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

const selectByIdClassificacao = async function (id_classificacao){

    try{
        let sql  = `select * from tbl_classificacao where id = ${id_classificacao}`

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
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao

    
}