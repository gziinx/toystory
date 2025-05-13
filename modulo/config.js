/******************************************************************
 * objetivo: Arquivo de configuraçao para padronizar mensagens e status code da API
 * data: 18/02/2025
 * autor: gustavo
 * versao: 1.0
 ******************************************************************/

/****************STATUS CODE DE MENSAGENS DE ERRO**********************/   

const ERROR_REQUIRED_FIELDS = {status: false, status_code:400, message: "Não foi possivel realizar a requisiçao, pois existem campos obrigatórios que não foram preenchidos ou não atendem a quantidade de caracteres!!!"}
const ERROR_INTERNAL_SERVER = {status: false, status_code:500, message:"Devido a erros internos internos no servidor, não foi possivel processar a requisição!!!"}


/****************STATUS CODE DE MENSAGENS DE SUCESSO**********************/ 

const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: "Item criado com sucesso!!!"}



module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER,
    SUCESS_CREATED_ITEM
}