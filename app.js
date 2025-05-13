/****************************************************************
 * objetivo: Criar uma api para realizar o CRUD do sistema de controle de Filmes
 * data: 11/02/2025
 * autor: gustavo
 * versao: 1.0 
 *Observaçao:
                     para criar a api precisamos instalar: 

                    express         npm install express --save
                    cors            npm install cors --save
                    body-parser     npm install body-parser --save

                    para criar a integraçao com o banco de dados precisamos instalar
                    prisma          npm install prisma --save   (para dazer a conexao com o banco de dados)
                    prisma/client   npm install @prisma/client --save  (para rodar os scripts SQL)
 ****************************************************************/
     //Import das bibliotecas para configurar a API
     const express        = require('express')
     const cors           = require('cors')
     const bodyParser     = require('body-parser')
     
     //Manipular o body da requisição para chegar apenas JSON
     const bodyParserJSON = bodyParser.json()

     //Cria o objeto app com referências do express para criar a API
     const app = express()
     
     //response - Significa a resposta da API
     //request - Significa a chegada de dados na API
     
     app.use((request, response, next) =>{
         response.header('Access-Control-Allow-Origin', '*')
         response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
     
         app.use(cors()) //Aplica/ATIVA as restrições do CORS da requisição
     
         next()
     })
     
//Permissão de quais metodos a API irá responder - CORS CUIDA DESSAS PERMISSÕES ---VERBOS HTTP
//get - pegar dados da API na tela
//post - inserir novos itens e salvar 
//put - alterar dados existentes na api
//delete - excluir item existente na API
//options - 

//____________________________________________________________________________________________________________________________________________________________

const controllerFilme = require('./controller/filme/controllerFilme')
const controllerGenero = require('./controller/filme/controllerGenero')
const controllerPremiacao = require ('./controller/filme/controllerPremiacao')
const controllerDublagem = require ('./controller/filme/controllerDublagem')
const controllerLegenda = require ('./controller/filme/controllerLegenda')
const controllerClassificacao = require ('./controller/filme/controllerClassificacao')

app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function (request, response){
   
    let contentType = request.headers['content-type']
   
    //Recebe o body da requisição os dados encaminhados
    let  dadosBody = request.body
    let resultFilme = await controllerFilme.inserirFilme(dadosBody ,contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)

})

app.get('/v1/controle-filmes/filme', cors (), async function (request, response)   {

    let resultFilme = await controllerFilme.listarFilme()
    
    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.get('/v1/controle-filmes/filme/:id', cors(), async function(request, response) {
    let id = request.params.id
    
    let result = await controllerFilme.buscarFilme(id)
  
    
        response.status(result.status_code)
        response.json(result)
     
  })

  app.delete('/v1/controle-filmes/filme/:id', cors(), async function(request, response) {
    let id_filme = request.params.id
    
    let result = await controllerFilme.excluirFilme(id_filme)
  
    
        response.status(result.status_code)
        response.json(result)
     
  })

  app.put('/v1/controle-filme/filmes/:id', cors(), bodyParserJSON,async function(request, response){

    //Recebe o content Type da requisição
  let contentType = request.headers['content-type']
  
  // Recebe o ID da requisição 
  let idFilme = request.params.id
  
  // Recebe os dados da requisição pelo body
  
  let dadosBody = request.body
  
  let resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)
  
  response.status(resultFilme.status_code)
  response.json(resultFilme)
   })


//genero

app.post('/v1/controle-genero/genero', cors(), bodyParserJSON, async function (request, response){
   
    let contentType = request.headers['content-type']
   
    //Recebe o body da requisição os dados encaminhados
    let  dadosBody = request.body
    let resultGenero = await controllerGenero.inserirGenero(dadosBody ,contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)

})

app.get('/v1/controle-genero/genero', cors (), async function (request, response)   {

    let resultGenero = await controllerGenero.listarGenero()
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-genero/genero/:id', cors(), async function(request, response) {
    let id = request.params.id
    
    let result = await controllerGenero.buscarGenero(id)
  
    
        response.status(result.status_code)
        response.json(result)
     
  })

app.delete('/v1/controle-genero/genero/:id', cors(), async function(request, response){
      let idGenero = request.params.id
     
     let result = await controllerGenero.excluirGenero(idGenero)
     response.status(result.status_code)
     response.json(result)
     })

  app.put('/v1/controle-genero/genero/:id', cors(), bodyParserJSON,async function(request, response){

    //Recebe o content Type da requisição
  let contentType = request.headers['content-type']
  
  // Recebe o ID da requisição 
  let idGenero = request.params.id
  
  // Recebe os dados da requisição pelo body
  
  let dadosBody = request.body
  
  let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)
  
  response.status(resultGenero.status_code)
  response.json(resultGenero)
   })

   //premiaçao


   app.post('/v1/controle-premiacao/premiacao', cors(), bodyParserJSON, async function (request, response){
   
    let contentType = request.headers['content-type']
   
    //Recebe o body da requisição os dados encaminhados
    let  dadosBody = request.body
    let resultPremiacao = await controllerPremiacao.inserirPremiacao(dadosBody ,contentType)

    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)

})

app.get('/v1/controle-premiacao/premiacao', cors (), async function (request, response)   {

    let resultPremiacao = await controllerPremiacao.listarPremiacao()
    
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})

app.get('/v1/controle-premiacao/premiacao/:id', cors(), async function(request, response) {
    let id = request.params.id
    
    let result = await controllerPremiacao.buscarPremiacao(id)
  
    
        response.status(result.status_code)
        response.json(result)
     
  })

  app.put('/v1/controle-premiacao/premiacao/:id', cors(), bodyParserJSON,async function(request, response){

    //Recebe o content Type da requisição
  let contentType = request.headers['content-type']
  
  // Recebe o ID da requisição 
  let idPremiacao = request.params.id
  
  // Recebe os dados da requisição pelo body
  
  let dadosBody = request.body
  
  let resultGenero = await controllerPremiacao.atualizarPremiacao(idPremiacao, dadosBody, contentType)
  
  response.status(resultGenero.status_code)
  response.json(resultGenero)
   })

   app.delete('/v1/controle-premiacao/premiacao/:id', cors(), async function(request, response) {
    let id_premiacao = request.params.id
    
    let resultPremiacao = await controllerPremiacao.excluirPremiacao(id_premiacao)
  
    
        response.status(resultPremiacao.status_code)
        response.json(resultPremiacao)
     
  })

//Dublagem

app.post('/v1/controle-dublagem/dublagem', cors(), bodyParserJSON, async function (request, response){
   
    let contentType = request.headers['content-type']
   
    //Recebe o body da requisição os dados encaminhados
    let  dadosBody = request.body
    let resultDublagem = await controllerDublagem.inserirDublagem(dadosBody ,contentType)

    response.status(resultDublagem.status_code)
    response.json(resultDublagem)

})
app.get('/v1/controle-dublagem/dublagem', cors (), async function (request, response)   {

    let resultDublagem = await controllerDublagem.listarDublagem()
    
    response.status(resultDublagem.status_code)
    response.json(resultDublagem)
})

app.get('/v1/controle-dublagem/dublagem/:id', cors(), async function(request, response) {
    let id = request.params.id
    
    let result = await controllerDublagem.buscarDublagem(id)
  
    
        response.status(result.status_code)
        response.json(result)
     
  })

  app.put('/v1/controle-dublagem/dublagem/:id', cors(), bodyParserJSON,async function(request, response){

    //Recebe o content Type da requisição
  let contentType = request.headers['content-type']
  
  // Recebe o ID da requisição 
  let idPremiacao = request.params.id
  
  // Recebe os dados da requisição pelo body
  
  let dadosBody = request.body
  
  let resultGenero = await controllerDublagem.atualizarDublagem(idPremiacao, dadosBody, contentType)
  
  response.status(resultGenero.status_code)
  response.json(resultGenero)
   })

   app.delete('/v1/controle-dublagem/dublagem/:id', cors(), async function(request, response) {
    let id_premiacao = request.params.id
    
    let resultPremiacao = await controllerDublagem.excluirDublagem(id_premiacao)
  
    
        response.status(resultPremiacao.status_code)
        response.json(resultPremiacao)
     
  })

  //Legenda

  app.post('/v1/controle-legenda/legenda', cors(), bodyParserJSON, async function (request, response){
   
    let contentType = request.headers['content-type']
   
    //Recebe o body da requisição os dados encaminhados
    let  dadosBody = request.body
    let resultDublagem = await controllerLegenda.inserirLegenda(dadosBody ,contentType)

    response.status(resultDublagem.status_code)
    response.json(resultDublagem)

})

app.get('/v1/controle-legenda/legenda', cors (), async function (request, response)   {

    let resultPremiacao = await controllerLegenda.listarLegenda()
    
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})
app.get('/v1/controle-legenda/legenda/:id', cors(), async function(request, response) {
    let id = request.params.id
    
    let result = await controllerLegenda.buscarLegenda(id)
  
    
        response.status(result.status_code)
        response.json(result)
     
  })


  app.put('/v1/controle-legenda/legenda/:id', cors(), bodyParserJSON,async function(request, response){

    //Recebe o content Type da requisição
  let contentType = request.headers['content-type']
  
  // Recebe o ID da requisição 
  let idPremiacao = request.params.id
  
  // Recebe os dados da requisição pelo body
  
  let dadosBody = request.body
  
  let resultGenero = await controllerLegenda.atualizarLegenda(idPremiacao, dadosBody, contentType)
  
  response.status(resultGenero.status_code)
  response.json(resultGenero)
   })

   app.delete('/v1/controle-legenda/legenda/:id', cors(), async function(request, response) {
    let id_premiacao = request.params.id
    
    let resultPremiacao = await controllerLegenda.excluirLegenda(id_premiacao)
  
    
        response.status(resultPremiacao.status_code)
        response.json(resultPremiacao)
     
  })
  

  //Classificaçao

  app.post('/v1/controle-classificacao/classificacao', cors(), bodyParserJSON, async function (request, response){
   
    let contentType = request.headers['content-type']
   
    //Recebe o body da requisição os dados encaminhados
    let  dadosBody = request.body
    let resultDublagem = await controllerClassificacao.inserirClassificacao(dadosBody ,contentType)

    response.status(resultDublagem.status_code)
    response.json(resultDublagem)

})
app.get('/v1/controle-classificacao/classificacao', cors (), async function (request, response)   {

    let resultPremiacao = await controllerClassificacao.listarClassificacao()
    
    response.status(resultPremiacao.status_code)
    response.json(resultPremiacao)
})
app.get('/v1/controle-classificacao/classificacao/:id', cors(), async function(request, response) {
    let id = request.params.id
    
    let result = await controllerClassificacao.buscarClassificacao(id)
  
    
        response.status(result.status_code)
        response.json(result)
     
  })


  app.put('/v1/controle-classificacao/classificacao/:id', cors(), bodyParserJSON,async function(request, response){

    //Recebe o content Type da requisição
  let contentType = request.headers['content-type']
  
  // Recebe o ID da requisição 
  let idPremiacao = request.params.id
  
  // Recebe os dados da requisição pelo body
  
  let dadosBody = request.body
  
  let resultGenero = await controllerClassificacao.atualizarClassificacao(idPremiacao, dadosBody, contentType)
  
  response.status(resultGenero.status_code)
  response.json(resultGenero)
   })

   app.delete('/v1/controle-classificacao/classificacao/:id', cors(), async function(request, response) {
    let id_premiacao = request.params.id
    
    let resultPremiacao = await controllerClassificacao.excluirClassificacao(id_premiacao)
  
    
        response.status(resultPremiacao.status_code)
        response.json(resultPremiacao)
     
  })
app.listen(9898, function(){
    console.log('API funcionando e aguardando requisições .....................................')
})

