'use strict'  //Força o JS ser mais criterioso, falha compilação se

//Importações
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({ //Criando esquema - o que compõem o product
    //É criado automatico um _id
    description: {
        type: String,
        required: [true, 'Escreva alguma coisa. É obrigatório'],
        trim: true //Remover os espaços antes e depois
    }
});
module.exports = mongoose.model('Product', schema); //Product = name