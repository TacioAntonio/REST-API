// Importando o módulo express
const express = require('express');
// Criando servidor
const app = express();
// Importando o nodemailer
const nodemailer = require('nodemailer');
// Importando o mail.json para usar os dados
const { host, port, user, pass } = require('../config/mail.json');
// Importando o template engine
const handlebars  = require('nodemailer-express-handlebars');
// Em config/mail foi criado um json para armazenar esses dados
// Esses dados estão localizados no mailtrap
const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});
// Configurando o handlebars
app.engine('handlebars', handlebars({defaultLayout: 'forgot_password'}))
app.set('view engine', 'handlebars')
// Exportando o transport
module.exports = transport;