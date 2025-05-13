/******************************************************************
 * objetivo: Controller responsavel pela regra de negocio referente ao CRUD de genero
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0
 ******************************************************************/
const message = require('../../modulo/config.js')

const dublagemDAO = require('../../model/dao/dublagem.js')

//inserir um genero no dao
 const inserirDublagem = async function(idioma, contentType){
    try {
        let response = {}

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if (idioma.idioma        == ''               || idioma.idioma                   == undefined || idioma.idioma           == null || idioma.idioma.length > 60            

         ){
            return message.ERROR_REQUIRED_FIELDS //erro 400
        }else{
            let resultDublagem = await dublagemDAO.insertDublagem(idioma)
            if(resultDublagem)
                return message.SUCESS_CREATED_ITEM //201
                else
                return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }else{
        return message.ERROR_CONTENT_TYPE //415
    }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
        
 }

//atualizar um filme no dao
const atualizarDublagem = async function(id, idioma, contentType) {

    try {
      if (String(contentType).toLowerCase() == 'application/json')
    
        {

      if (  id      == ''            || id == undefined                    || id ==  null                   || isNaN(id) || id <= 0                      ||
        idioma.idioma        == ''               || idioma.idioma                   == undefined || idioma.idioma           == null || idioma.idioma.length > 60                    
        ) 
     {
        return message.ERROR_REQUIRED_FIELDS // 400   
      } else {
     //Validação para verificar se o ID existe no BD
     let resultDublagem = await dublagemDAO.selectByIdDublagem(parseInt(id))
    
     if(resultDublagem != false || typeof(resultDublagem) == 'object'){
      if(resultDublagem.length > 0 ){
        //  Update
        //Adiciona o ID do filme no JSON com os dados
          idioma.id = parseInt(id)
          
         let result = await dublagemDAO.updateDublagem(idioma)
    
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
const excluirDublagem = async function(id) {
      try {
        if(id == '' || id == undefined || id == null|| isNaN(id) || id <=0 ){
          return message.ERROR_REQUIRED_FIELDS //400
        }else{
          let resultGenero = await dublagemDAO.selectByIdDublagem(parseInt(id))
    
          if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){
              //Delete
              let result = await dublagemDAO.deleteDublagem(parseInt(id))
    
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
const listarDublagem = async function(){
    try{

        let dadosDublagem = {}
        let resultDublagem = await dublagemDAO.selectAllDublagem()

        if(resultDublagem != false){
            if(resultDublagem.length > 0 ){
                dadosDublagem.status = true
                dadosDublagem.status_code = 200
                dadosDublagem.itens = resultDublagem.length
                dadosDublagem.dublagem = resultDublagem

                return dadosDublagem
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
const buscarDublagem = async function(id_dublagem){  
    try { 
            if(
                id_dublagem == ''               ||   id_dublagem                == undefined || id_dublagem            == null || isNaN(id_dublagem) || id_dublagem <=0
            ){
                return message.ERROR_REQUIRED_FIELDS //erro 400
            }else{
                dadosDublagem = {}
                let resultDublagem = await dublagemDAO.selectByIdDublagem(parseInt(id_dublagem))
                if(resultDublagem != false || typeof(resultDublagem) == 'object'){
                    if(resultDublagem.length > 0){
                        dadosDublagem.status = true
                        dadosDublagem.status_code = 200
                        dadosDublagem.dublagem = resultDublagem
                return dadosDublagem
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
    inserirDublagem,
    atualizarDublagem,
    excluirDublagem,
    listarDublagem,
    buscarDublagem
}