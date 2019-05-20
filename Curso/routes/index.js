module.exports = (app)=>{ // No index esta inserindo o app - como insere o app então usa-se uma function
  app.get('/', (req, res)=>{ // o parametro antes '/' É A ROTA
     res.statusCode = 200; //Conexao certa http - certeza
     res.setHeader('Content-Type', 'text/html'); // Para identificar HTML5 mesmo
     res.end('<h1> Olá </h1>'); //Dar resposta para servidor não rodar sem fim
  });
}; //Tudo que for criado em routes será exportado para quem chamar ele.