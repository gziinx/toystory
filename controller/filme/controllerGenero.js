/******************************************************************
 * objetivo: Controller responsavel pela regra de negocio referente ao CRUD de genero
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0
 ******************************************************************/
const message = require('../../modulo/config.js')

const generoDAO = require('../../model/dao/genero.js')

//inserir um genero no dao
 const inserirGenero = async function(genero, contentType){
    try {
        let response = {}

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if (genero.genero        == ''               || genero.genero                   == undefined || genero.genero            == null || genero.genero.length > 60            

         ){
            return message.ERROR_REQUIRED_FIELDS //erro 400
        }else{
            let resultGenero = await generoDAO.insertGenero(genero)
            if(resultGenero)
                return message.SUCESS_CREATED_ITEM //201
                else
                return message.ERROR_INTERNAL_SERVER //500
        }
    }else{
        return message.ERROR_CONTENT_TYPE //415
    }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
        
 }

//atualizar um filme no dao
const atualizarGenero = async function(id, genero, contentType) {

    try {
      if (String(contentType).toLowerCase() == 'application/json')
    
        {

      if (  id      == ''            || id == undefined                    || id ==  null                   || isNaN(id) || id <= 0                      ||
            genero.genero == ''            || genero.genero == undefined            || genero.genero == null            || genero.genero.length > 60                    
        ) 
     {
        return message.ERROR_REQUIRED_FIELDS // 400   
      } else {
     //Validação para verificar se o ID existe no BD
     let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))
    
     if(resultGenero != false || typeof(resultGenero) == 'object'){
      if(resultGenero.length > 0 ){
        //  Update
        //Adiciona o ID do filme no JSON com os dados
          genero.id = parseInt(id)
          
         let result = await generoDAO.updateGenero(genero)
    
         if(result){
          return message.SUCESS_UPDATED_ITEM
          // 200
         }else{
          return message.ERROR_INTERNAL_SERVER_MODEL //500
         }
        }else{
          return message.ERROR_NOT_FOUND // 404
        }
     }else{
      return message.ERROR_INTERNAL_SERVER_MODEL // 500
     }
      }
      }else{
        return message.ERROR_CONTENT_TYPE // 415
      }
      } catch (error) {
      
    }
    
    
      
    }
    
    // Função para tratar a exclusão de um filme no DAO
    const excluirGenero = async function(id) {
      try {
        if(id == '' || id == undefined || id == null|| isNaN(id) || id <=0 ){
          return message.ERROR_REQUIRED_FIELDS //400
        }else{
          let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))
    
          if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){
              //Delete
              let result = await generoDAO.deleteGenero(parseInt(id))
    
              if(result){
                return message.SUCESS_DELETED_ITEM // 200
              }else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
              }
    
            }else{
              return message.ERROR_NOT_FOUND // 404
            }
          }else{
           return message.ERROR_INTERNAL_SERVER_MODEL // 500
          }
        }
      } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
      }
    
    }
//listar um filme no dao
const listarGenero = async function(){
    try{

        let dadosGenero = {}
        let resultGenero = await generoDAO.selectAllGenero()

        if(resultGenero != false){
            if(resultGenero.length > 0 ){
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.itens = resultGenero.length
                dadosGenero.genero = resultGenero

                return dadosGenero
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }catch(error){
            return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//buscar um filme no dao
const buscarGenero = async function(id_genero){  
    try { 
            if(
                id_genero == ''               ||   id_genero                == undefined || id_genero            == null || isNaN(id_genero) || id_genero <=0
            ){
                return message.ERROR_REQUIRED_FIELDS //erro 400
            }else{
                dadosGenero = {}
                let resultGenero = await generoDAO.selectByIdGenero(parseInt(id_genero))
                if(resultGenero != false || typeof(resultGenero) == 'object'){
                    if(resultGenero.length > 0){
                        dadosGenero.status = true
                        dadosGenero.status_code = 200
                        dadosGenero.genero = resultGenero
                return dadosGenero
                    }else{
                        return message.ERROR_NOT_FOUND //404
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
                    
            }
        
        }catch(error){
            return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
}


module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}