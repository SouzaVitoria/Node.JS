'use strict'  //Força o JS ser mais criterioso, falha compilação se

//Importações
const express = require('express');
const router = express.Router(); //Arquivo de rotas

router.get('/', (req, res, next) => { //Request e  response
    res.status(200).send({ //enviando resposta
        title: "Node Store API",
        version: "0.0.1"
    })
 });
 
 module.exports = router; //Para exportar essa classe -> app