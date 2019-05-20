module.exports = {
  send: (err, req, res, code = 400)=>{
     console.log(`error: ${err}`); // - ONDE FOI O ERRO
     res.status(code).json({  //Resposta para o servidor - 400 erro de envio do usuário e aparecer que erro que foi - TIPO DO ERRO
          error:err
     });
  }
};