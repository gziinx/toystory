/******************************************************************
 * objetivo: Controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0
 ******************************************************************/
const message = require('../../modulo/config.js')

const premiacaoDAO = require('../../model/dao/premiacao.js')

//inserir um filme no dao
 const inserirPremiacao = async function(premiacao, contentType){
    try {
        let response = {}

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if (    premiacao.nome        == ''               || premiacao.nome                   == undefined || premiacao.nome            == null || premiacao.nome.length > 80            ||
                    premiacao.tipo         == ''               || premiacao.tipo                == undefined || premiacao.tipo        == null || premiacao.tipo.length > 80         
        
        ){
            return message.ERROR_REQUIRED_FIELDS //erro 400
        }else{
            let resultPremiacao = await premiacaoDAO.insertPremiacao(premiacao)
            if(resultPremiacao)
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
const atualizarPremiacao = async function(id, premiacao, contentType) {
  try {
      if (String(contentType).toLowerCase() == 'application/json') {

          // Validação de campos obrigatórios e com limites
          if (
              id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
              premiacao.nome == '' || premiacao.nome == undefined || premiacao.nome == null || premiacao.nome.length > 80 ||
              premiacao.tipo == '' || premiacao.tipo == undefined || premiacao.tipo == null || premiacao.tipo.length > 80
          ) {
              return message.ERROR_REQUIRED_FIELDS // 400
          } else {
              // Validação para verificar se o ID existe no BD
              let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

              if (resultPremiacao && typeof(resultPremiacao) === 'object') {
                  // Se resultPremiacao for encontrado, procede com o update
                  if (resultPremiacao.length > 0) {
                      premiacao.id = parseInt(id)

                      let result = await premiacaoDAO.updatePremiacao(premiacao)

                      if (result) {
                          return message.SUCESS_UPDATED_ITEM // 200
                      } else {
                          return message.ERROR_INTERNAL_SERVER_MODEL // 500
                      }
                  } else {
                      return message.ERROR_NOT_FOUND // 404
                  }
              } else {
                  return message.ERROR_INTERNAL_SERVER_MODEL // 500
              }
          }
      } else {
          return message.ERROR_CONTENT_TYPE // 415
      }
  } catch (error) {
      return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }
}

    
    // Função para tratar a exclusão de um filme no DAO
const excluirPremiacao = async function(id) {
      try {
        if(id == '' || id == undefined || id == null|| isNaN(id) || id <=0 ){
          return message.ERROR_REQUIRED_FIELDS //400
        }else{
          let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))
    
          if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
            if(resultPremiacao.length > 0){
              //Delete
              let result = await premiacaoDAO.deletePremiacao(parseInt(id))
    
              if(result){
                return message.SUCESS_CREATED_ITEM // 200
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
const listarPremiacao = async function(){
    try{

        let dadosPremiacao = {}
        let resultPremiacao = await premiacaoDAO.selectAllPremiacao()

        if(resultPremiacao != false){
            if(resultPremiacao.length > 0 ){
                dadosPremiacao.status = true
                dadosPremiacao.status_code = 200
                dadosPremiacao.itens = resultPremiacao.length
                dadosPremiacao.premiacao = resultPremiacao

                return dadosPremiacao
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
const buscarPremiacao = async function(id_premiacao){  
    try { 
            if(
                id_premiacao == ''               ||   id_premiacao                == undefined || id_premiacao            == null || isNaN(id_premiacao) || id_premiacao <=0
            ){
                return message.ERROR_REQUIRED_FIELDS //erro 400
            }else{
                let dadosPremiacao = {}
        let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id_premiacao))

        if(resultPremiacao != false){
            if(resultPremiacao.length > 0 ){
                dadosPremiacao.status = true
                dadosPremiacao.status_code = 200
                dadosPremiacao.itens = resultPremiacao.length
                dadosPremiacao.premiacao = resultPremiacao

                return dadosPremiacao
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
    inserirPremiacao,
    atualizarPremiacao,
    excluirPremiacao,
    listarPremiacao,
    buscarPremiacao
}