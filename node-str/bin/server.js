//Importações
const app = require('../src/app'); //importando a app que foi exportada 
const debug = require('debug')('balta:server');
const http = require('http');

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

//Criando Servidor
const server = http.createServer(app);

server.listen(port);
server.on('error', onError); //Chamando a function onError
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

function normalizePort(val){
    const port = parseInt(val, 10);
    if(isNaN(port)){ //Se o valor não for um numero retorna 10
        return val;
    } if(port >= 0){
        return port;
    }
    return false;
}

function onError(error){ //Receber erro do servidor - Se a porta já esta sendo usada ou não
    if(error.syscall !== 'listen'){
        throw error;
    }
    const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

    switch(error.code){
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
        break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
        break;
        default:
          throw error;
    }
}

function onListening(){ //Pegar informações do servidor
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind); //Start debug
}