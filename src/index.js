// Importando o módulo express - Ajudar a fazer tratativas de rotas e requests HTTP
// $ npm install express
const express = require('express');
// Importando o módulo body-parse - Converter os dados de uma requisição
// $ npm install body-parser
const bodyParser = require('body-parser');
// Criando servidor
const app = express();
// Entender quando enviar uma requisição para a API com informações em JSON
app.use(bodyParser.json());
// Entender quando enviar parametros via URL para  ele conseguir decodar esses parametros da própria URL
app.use(bodyParser.urlencoded({ extended: false }));
// Importando o módulo authController
// O app do express é criado uma vez e repassado para os demais arquivos
// # Repassando o app para o index no controllers
require('./app/controllers/index')(app);
// Escutando a porta 3000
app.listen(3000, ()=>{
    console.log(`
    Servidor criado escutando a porta 8080, acesse http://localhost:3000
    Para desligar: Ctrl+c
    `);
});