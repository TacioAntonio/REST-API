// Criando conexão com o banco de dados
// Instale MongoDB na máquina
// $ npm install mongoose
const mongoose = require('mongoose');
// Conectando ao banco de dados - mongodb://localhost/{nome do banco de dados}
mongoose.connect('mongodb://localhost/noderest', { useCreateIndex: true, useNewUrlParser: true });
// Dizemos pro mongoose utilizar as promises do NodeJS como padrão
mongoose.Promise = global.Promise;
// Exportando o mongoose
module.exports = mongoose;