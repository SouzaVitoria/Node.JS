'use strict'

//Importações
const express = require('express');
const router = express.Router(); //Arquivo de rotas
const controller = require('../controllers/product-controller');

router.get('/admin/:id', controller.getById);
router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/admin/:id', controller.delete);

module.exports = router; //Para exportar essa classe -> app

