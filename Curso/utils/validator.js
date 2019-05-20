module.exports = {
 user:(app,req, res)=>{
    req.assert('name', 'Nome é obrigatório').notEmpty();//Verificar campos do body, o campo e a mensagem de erro - .notEmpty campo vazio
    req.assert('email', 'E-mail esta invalido').notEmpty().isEmail();//Verificar campos do body - .notEmpty campo vazio
    let errors = req.validationErrors();

    if (errors) {
      app.utils.error.send(errors, req, res)
      return false; //Return não é suficiente para parar a execução do outro lado por isso lá precisa para 
    }else{
        return true;
    }
 }
}