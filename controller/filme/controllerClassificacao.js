/******************************************************************
 * objetivo: Controller responsavel pela regra de negocio referente ao CRUD de genero
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0
 ******************************************************************/
const message = require('../../../toystory/modulo/config.js')

const  classificacaoDAO = require('../../../toystory/model/dao/classificacao.js')

//inserir um genero no dao
const inserirClassificacao = async function(genero, contentType){
  try {
      if(String(contentType).toLowerCase() == 'application/json')
      {
              if (genero.idade_minima        == ''               || genero.idade_minima                    == undefined || genero.idade_minima             == null || genero.idade_minima .length > 2 ||
                genero.link_icon        == ''               || genero.link_icon                    == undefined || genero.link_icon         == null || genero.link_icon .length > 200
              )
              {
                  return message.ERROR_REQUIRED_FIELDS //400
              }else{
                  //Chama a função para inserir no BD e aguarda o retorno da função
                  let resultClassificacao = await classificacaoDAO.insertClassificacao(genero)

                  if(resultClassificacao)
                      return message.SUCESS_CREATED_ITEM//201
                  else
                      return message.ERROR_INTERNAL_SERVER_MODEL //500
              }
      }else{
          return message.ERROR_CONTENT_TYPE //415
      }
  } catch (error) {
      return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}


//atualizar um filme no dao
const atualizarClassificacao = async function(id, genero, contentType) {

    try {
      if (String(contentType).toLowerCase() == 'application/json')
    
        {

      if (  id      == ''            || id == undefined                    || id ==  null                   || isNaN(id) || id <= 0                      ||
      genero.idade_minima        == ''               || genero.idade_minima                    == undefined || genero.idade_minima             == null || genero.idade_minima .length > 5 ||
      genero.link_icon        == ''               || genero.link_icon                   == undefined || genero.link_icon         == null || genero.link_icon .length > 200
     ) 
     {
        return message.ERROR_REQUIRED_FIELDS // 400   
      } else {
     //Validação para verificar se o ID existe no BD
     let resultGenero = await classificacaoDAO.selectByIdClassificacao(parseInt(id))
    
     if(resultGenero != false || typeof(resultGenero) == 'object'){
      if(resultGenero.length > 0 ){
        //  Update
        //Adiciona o ID do filme no JSON com os dados
          genero.id = parseInt(id)
          
         let result = await classificacaoDAO.updateClassificacao(genero)
    
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
    const excluirClassificacao = async function(id) {
      try {
        if(id == '' || id == undefined || id == null|| isNaN(id) || id <=0 
            ){
          return message.ERROR_REQUIRED_FIELDS //400
        }else{
          let resultGenero = await classificacaoDAO.selectByIdClassificacao(parseInt(id))
    
          if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){
              //Delete
              let result = await classificacaoDAO.deleteClassificacao(parseInt(id))
    
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
const listarClassificacao = async function(){
    try {
        //Objeto do tipo JSON
        let dadosclassificacao = {}
        //Chama a função para retornar os classificacaos cadastrados
        let resultClassificacao = await classificacaoDAO.selectAllClassificacao()

        if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
            if(resultClassificacao.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosclassificacao.status = true
                dadosclassificacao.status_code = 200
                dadosclassificacao.items = resultClassificacao.length
                dadosclassificacao.classificacao = resultClassificacao

                return dadosclassificacao
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//buscar um filme no dao
const buscarClassificacao = async function(id_classificacao){  
  try { 
      // Valida se o id_classificacao é válido
      if (
          id_classificacao == '' || 
          id_classificacao == undefined || 
          id_classificacao == null || 
          isNaN(id_classificacao) || 
          id_classificacao <= 0
      ) {
          return message.ERROR_REQUIRED_FIELDS; // erro 400
      } else {
          // Inicializa o objeto para armazenar os dados da classificação
          let dadosClassificacao = {};

          // Consulta ao banco de dados para buscar a classificação pelo id_classificacao
          let resultClassificacao = await classificacaoDAO.selectByIdClassificacao(parseInt(id_classificacao));

          // Verifica se a consulta retornou um resultado válido
          if (resultClassificacao != false || typeof(resultClassificacao) == 'object') {
              if (resultClassificacao.length > 0) {
                  // Preenche os dados da classificação
                  dadosClassificacao.status = true;
                  dadosClassificacao.status_code = 200;
                  dadosClassificacao.classificacao = resultClassificacao;

                  return dadosClassificacao;
              } else {
                  return message.ERROR_NOT_FOUND; // 404
              }
          } else {
              return message.ERROR_INTERNAL_SERVER_MODEL; // 500
          }
      }
      
  } catch (error) {
      return message.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
}


module.exports = {
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao,
    listarClassificacao,
    buscarClassificacao
}