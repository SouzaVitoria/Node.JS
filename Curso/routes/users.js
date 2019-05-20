let NeDB = require('nedb');
let db = new NeDB({
  filename: 'users.db',  //Arquivo criar em disco
  autoload: true  //Se o arquivo não existir já cria ou guardar
});

module.exports = (app) => { // No index esta inserindo o app - como insere o app então usa-se uma function
  let route = app.route('/users'); //Definindo rota

  route.get((req, res) => { // o parametro antes ';/' É A ROTA
    db.find({}).sort({ name: 1 }).exec((err, users) => {//Listar usuários. sort é ordenar, 1 crescente e -1 é decrescente
      if (err) {
        app.utils.error.send(err, req, res); //error nome do arquivo. Send é o nome do nosso objeto
      } else {
        res.statusCode = 200; //Conexao certa http - certeza
        res.setHeader('Content-Type', 'application/json'); // Para identificar HTML5 mesmo
        res.json({ //Dar resposta para servidor não rodar sem fim
          users //Chave com mesmo nome da variavel pode usar uma vez apenas - users: users
        });
      }
    })
  });

  route.post((req, res) => { //Salvar registro dentro do BD
    if(!app.utils.validator.user(app,req, res)) return false; //Se retornar false o retorn é false também

    db.insert(req.body, (err, user) => { // Erro e registro do usuário - req.body é um objeto no POSTMAN onde os Dados estão
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(user);
      }
    });
  });

  let routeId = app.route('/users/:id'); //Rota para determinado ID
  routeId.get((req, res) => { //Aparecer id selecionado, especifico - mostar detalhes - BUSCAR
    db.findOne({ _id: req.params.id }).exec((err, user) => { // findOne (FILTRO - req.params é o id) trás dados apenas de um registro  - Dados estão em req.body
      if (err) {
        console.log(`error: ${err}`); // - ONDE FOI O ERRO
        res.status(400).json({ error: err });//Resposta para o servidor - 400 erro de envio do usuário e aparecer que erro que foi - TIPO DO ERRO
      } else {
        res.status(200).json(user); //Retornar os users para tela
      }
    });
  });

  routeId.put((req, res) => { //Aparecer id selecionado E EDITAR, especifico - mostar detalhes

    if(!app.utils.validator.user(app,req, res)) return false; //Se retornar false o retorn é false também

    db.update({ _id: req.params.id }, req.body, err => { //  (FILTRO - req.params é o id) trás dados apenas de um registro
      if (err) {
        console.log(`error: ${err}`); // - ONDE FOI O ERRO
        res.status(400).json({ error: err });//Resposta para o servidor - 400 erro de envio do usuário e aparecer que erro que foi - TIPO DO ERRO
      } else {
        res.status(200).json(Object.assign(req.params, req.body)); //Retornar os dados para tela - ASSIGN junta objetos - MOSTRANDO NA TELA TODOS OS DADOS JUNTOS
      }
    });
  });

  routeId.delete((req, res) => {
    db.remove({ _id: req.params.id }, {}, err => {
      if (err) {
        console.log(`error: ${err}`); // - ONDE FOI O ERRO
        res.status(400).json({ error: err });//Resposta para o servidor - 400 erro de envio do usuário e aparecer que erro que foi - TIPO DO ERRO
      } else {
        res.status(200).json(req.params); //Retornar os dados para tela - MOSTRANDO NA TELA O ID DO OBJETO EXCLUIDO
      }
    });
  });
}