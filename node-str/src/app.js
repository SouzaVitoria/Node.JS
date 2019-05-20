'use strict'  //Força o JS ser mais criterioso, falha compilação se

//Importações
const express = require('express');
const bodyParser = require('body-parser'); //importar esse modulo para que consiga converter object em JSON na rota post
const mongoose = require('mongoose');

const app = express();

//Conectar ao banco - mongoDB
mongoose.connect('mongodb+srv://vitoria:123@cluster0-y9tog.mongodb.net/test?retryWrites=true');

//Importa, carrega os arquivos
const Product = require('./models/product-model');
const indexRoutes = require('./routes/index-route');
const productsRoutes = require('./routes/product-route');



//Todo request que vier passa por aqui - application esta usando ele por isso coloca fora e antes das rotas
app.use(bodyParser.json()); //Todo o conteudo converte para JSON
app.use(bodyParser.urlencoded({extended: false})); //Codificar a url

 //Atribuição das rotas
app.use('/', indexRoutes); 
app.use('/products', productsRoutes);


module.exports = app; //Para exportar essa classe -> app
