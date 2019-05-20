'use strict';

//Importar
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

//Listar todos os produtos
exports.get = (req, res, next) => {
    Product
        .find({}) //Segunda opção do find são os campos que queremos... Active: true = só vai trazer produtos ativos ou find({}, 'description')
        .then(data => { //Salvando item no banco de dados
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}
exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id) //Segunda opção do find são os campos que queremos... Active: true = só vai trazer produtos ativos
        .then(data => { //Salvando item no banco de dados
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.post = (req, res, next) => {
    const product = new Product(req.body); // A mesma coisa que fazer um por um = product.title = req.body.title;
    product
        .save()
        .then(x => { //Salvando item no banco de dados
            res.status(201).send({ message: 'Produto Cadastrado com Sucesso', data: product });
        }).catch(e => {
            res.status(400).send({ message: 'Falha ao carregar o produto ', data: e });
        });

};

exports.put = (req, res, next) => {
    const id = req.params.id; //Pegar params
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                description: req.body.description
            }
        })
        .then(x => { //Salvando item no banco de dados
            return Product.findOne({ _id: req.params.id });
        })
        .then(product => {
            res.status(200).send({
                message: 'Produto Atualizado com Sucesso', 
                product
            });
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao Atualizar o produto ',
                data: e
            });
        });
}


exports.delete = (req, res, next) => {
    Product
        .findByIdAndRemove(req.params.id)
        .then(x => { //Salvando item no banco de dados
            res.status(200).send({
                message: 'Produto Removido com Sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao Remover o produto ',
                data: e
            });
        });
};
