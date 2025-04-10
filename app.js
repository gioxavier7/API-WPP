/**
 * API do projeto whatsapp
 * dev: giovanna xavier
 * data: 06/02/2025
 * versão: 1.0
 */

const express = require('express')
const cors = require('cors')
const bodyParse = require('body-parser')

const app = express()

app.use((request, response, next) => {
    response.header('Acces-Control-Allow-Origin', '*')
    response.header('Acces-Control-Allow-Methods', 'GET')

    app.use(cors())
    next()
})

const whatsapp = require('./modulos/funcoes.js')

// endpoint para retornar filtro que relaciona users - FILTRO
app.get('/v1/whatsapp/conversas/usuario', cors(), function(request, response){
    let numeroTelefone = request.query.numeroTelefone
    let contato = request.query.contato

    let dadosContatos = whatsapp.getFiltroUser(numeroTelefone, contato)

    if(dadosContatos){
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({ 'status': 404, 'message': 'Não foram encontrados dados para retornar' })
    }
})

// endpoint que retorna filtro de palavra-chave - FILTRO
app.get('/v1/whatsapp/conversas', cors(), async function(request, response){
    
    let numeroTelefone = request.query.numeroTelefone
    let nomeContato = request.query.nomeContato
    let palavraChave = request.query.palavraChave

    let dadosContatos = whatsapp.getFiltroUser(numeroTelefone, nomeContato, palavraChave)

    if(dadosContatos){
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    } 
})

// endpoint para retornar dados profile
app.get('/v1/whatsapp/user/profile/:telefone', cors(), async function(request, response){

    let numeroTelefone = request.params.telefone

    let dadosContatos = whatsapp.getDadosProfile(numeroTelefone)

    if(dadosContatos){
        response.status(200)
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

// endpoint para retornar dados pessoais do usuario
app.get('/v1/whatsapp/user/:telefone', cors(), async function(request, response){

    let numeroTelefone = request.params.telefone

    let dadosContatos = whatsapp.getDadosPessoal(numeroTelefone)

    if(dadosContatos){
        response.status(200)
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

// endpoint para retornar lista de contatos para cada usuário
app.get('/v1/whatsapp/contatos/:telefone', cors(), async function(request, response){

    let numeroTelefone = request.params.telefone

    let dadosContatos = whatsapp.getDadosContatos(numeroTelefone)
    
    if(dadosContatos){
        response.status(200)
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})

// endpoint para retornar lista de conversas
app.get('/v1/whatsapp/conversas/:telefone', cors(), async function(request, response){

    let numeroTelefone = request.params.telefone

    let dadosContatos = whatsapp.getlistaConversaUser(numeroTelefone)

    if(dadosContatos){
        response.status(200)
        response.json(dadosContatos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados dados para retornar'})
    }
})


// API aguardando novas requisições
app.listen('8080', function(){
    console.log('API aguardando novas requisições...')
})