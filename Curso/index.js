// Carregar os módulos
 const express = require('express'); //Carregando o módulo express
 const consign = require('consign');
 const bodyParser = require('body-parser'); //solicitar - body-parser é o nome do modulo para pegar metodos em post
 const expressValidator = require('express-validator'); //Para validar os dados 

 let app = express(); //Função que vai retornar toda a aplicação que esta lá dentro 

 //Need to use the body-parse dentro da express.
 app.use(bodyParser.urlencoded({ extend:false})); //urlenconded
 app.use(bodyParser.json());// Json is the method do bodyParser, que faz a conversão em json
 app.use(expressValidator()); 

 consign()
    .include('routes')
    .include('utils')
    .into(app); //Consign incluir a pasta routes e utils - Passando app para os arquivos

app.listen(3001, '127.0.0.1', ()=>{ //Servidor ouvindo(porta, IP Local)
        console.log('Servidor Rodando');
})