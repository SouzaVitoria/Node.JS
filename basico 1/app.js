const app = require('express')(); //pegar uma função e executar ela por isso ()

app.listen(3000, (req, res)=>{ //Conectando ao servidor - porta, requisicao e 
  console.log('Servidor Rodando');
});

app.get('/empregados', (req, res)=>{
 res.send(empregados); //query é depois da interrogação na URL - MOSTRAR ONDE ESTA A LISTA JSON
});

app.post('/empregados', (req, res)=>{
  //res.send(req.headers); //headers -> Postman
  let novoFuncionario = {
    nome: req.headers.nome,
    funcao: req.headers.funcao
  }
  // empregados.push(req.headers);
  empregados.push(novoFuncionario);
  res.send("Funcionário inserido com sucesso");
});

app.put('/empregados/:id', (req, res)=>{ //:id -> Quando é um parametro, tem que ter qualquer variavel na URL
  for(const empregado of empregados){ //Pegar valores de uma lista. = forEach
    if(empregado.nome === req.params.id){
      res.send(empregado);
       return;
    }
  }
   res.send("Não foi possível localizar o empregado " + req.params.id); 
});

const empregados = [
  {
    nome: "Vitoria",
    funcao: "Desenvolvedor"
  },
  {
    nome: "Viih",
    funcao: "Designer"
  },
  {
    nome: "Junior",
    funcao: "Tester"
  }
];