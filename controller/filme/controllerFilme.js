/******************************************************************
 * objetivo: Controller responsavel pela regra de negocio referente ao CRUD de filme
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0
 ******************************************************************/
const message = require('../../modulo/config.js')

const filmeDAO = require('../../model/dao/filmes.js')

//inserir um filme no dao
 const inserirFilme = async function(filme){
        let response = {}

        if (filme.nome            == ''               || filme.nome                   == undefined || filme.nome            == null || filme.nome.length > 80            ||
            filme.duracao         == ''               || filme.duracao                == undefined || filme.duracao         == null || filme.duracao.length > 5          ||
            filme.sinopse         == ''               || filme.sinopse                == undefined || filme.sinopse         == null ||
            filme.data_lancamento == ''               || filme.data_lancamento        == undefined || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
            filme.foto_capa       == undefined        || filme.foto_capa.length       > 200         ||
            filme.link_trailer    == undefined        || filme.link_trailer.length    > 200 
        
        ){
            return message.ERROR_REQUIRED_FIELDS //erro 400
        }else{
            let resultFilme = await filmeDAO.insertFilme(filme)
            if(resultFilme)
                return message.SUCESS_CREATED_ITEM
                else
                return message.ERROR_INTERNAL_SERVER
        }

        
 }
//atualizar um filme no dao
 const atualizarFilme = async function(){
     
}
//excluir um filme no dao
const excluirFilme = async function(){
     
}
//listar um filme no dao
const listarFilme = async function(){
     
}

//buscar um filme no dao
const buscarFilme = async function(){
     
}

module.exports = {
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}