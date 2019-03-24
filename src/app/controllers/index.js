/*
    Importando authController e projectController
    e demais módulos dentro do controllers, e com isso o index.js
    local que será importado no index.js global
*/
// fs - É para trabalar com arquivos no NodeJS
const fs = require('fs');
// path - É para trabalhar com caminhos de pastas
const path = require('path');

module.exports = app => {
    fs
      .readdirSync(__dirname)//Lendo um diretório
      .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))//Filtrando arquivos
      .forEach(file => require(path.resolve(__dirname, file))(app))//Percorrendo os arquivos
};