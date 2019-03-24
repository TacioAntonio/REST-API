/*
    Controller - Responsável por receber todas as requisições do usuário.
*/
// Controle de autenticação
// Importando o express porque é necessário mexer em rotas
const express = require('express');
// Puxando o Model de user para fazer as ações de login e cadastro, porque você
// precisa trabalhar com esse modelo de dados
const User = require('../models/user');
// Importando a rota do módulo do express e armazenando em uma constante
const router = express.Router();
// Importando o módulo JSON web token
const jwt = require('jsonwebtoken');
// Importando o hash em config
const hash = require('../../config/auth');
// Importando bcrypt para autenticação
const bcrypt = require('bcryptjs');
// Importando o crypto do próprio nodejs para a parte de esqueceu a senha
const crypto = require('crypto');
// Importando o mailer, para enviar o email para o usuário de novo token e senha
const mailer = require('../../modules/mailer');
// Gerando um token de autenticação
                    // Chamando o user.id, pois ele é algo que nunca vai repetir, Checando se a autenticação é dessa API, passando um hash
function generateToken(params = {}){
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    return jwt.sign(params, hash.secret,{
        // Com isso o token irá expirar em 86400 segundos
        expiresIn: 86400,
    });
}

// Definindo uma rota de cadastro
router.post('/register', async (req, res) => {
    // Destructor
    const { email } = req.body;

    try {
        // Checando se o email já existe
        if(await User.findOne({ email })){
            return res.json({ success: false, message: 'User already exists', statusCode: 400 })
        }
        // Criar um novo usuário quando chamar essa rota
        // Enviando o { name, email e password } para o User.create
        // Todos os parametros estarão dentro de req.body
        const user = await User.create(req.body);
        // Com isso estamos definindo que o password é undefined assim que o usuário for criado
        user.password = undefined;
        // Checando se registrou normalmente
        // Passando um gerador de token
        return res.send({ 
            user, 
            token: generateToken({ id: user.id }) 
        })
    } catch(err) {
        // Sempre que acontecer uma falha no registro
        // return res.sendStatus(400).send({ error: 'Registration failed' });
        return res.json({ success: false, message: 'Registration failed', statusCode: 400 });
    }
});
// ROTA DE autenticação COM JWT - VALIDAÇÕES DO LOGIN
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    // Buscando usuário no banco de dados para checar se existe realmente
                                            // Isso é para buscar a senha que está com select false
    const user = await User.findOne({ email }).select('+password');
    // Checar se usuário não existe, se não conseguiu encontrar o usuário
    if(!user){
        // return res.sendStatus(400).send({ error: 'User not found'});
        return res.json({ success: false, message: 'User not found', statusCode: 400 });
    }
    // Bcrypt retorna uma promisse
    // Checar se realmente a senha é a que o usuário se cadastrou
    // Está checando respectivamente se o password do usuário é o mesmo registrado no banco de dados
    // O ! NOT está checando se não são iguais
    if(!await bcrypt.compare(password, user.password)){
        // return res.sendStatus(400).send({ error: 'Invalid password' });
        return res.json({ success: false, message: 'Invalid password', statusCode: 400 });
    }
    // Com isso estamos definindo que o password é undefined assim que o usuário for criado
    user.password = undefined;
    // Checando se logou normalmente com o usuário
    // Passando um gerador de token
    return res.send({ 
        user, 
        token: generateToken({ id: user.id }) 
    });
});
// ROTA DE ESQUECEU A SENHA
router.post('/forgot_password', async (req, res) => {
    // Recebendo o email do usuário
    const { email } = req.body;

    try {
        // Vendo se o email está cadastrado na base de dados
        const user = await User.findOne({ email });

        // Caso não seja cadastrado retorna 'User not found'
        if(!user){
            return res.json({ success: false, message: 'User not found', statusCode: 400 });
        }
        // Gerando um token - Token aleatório de 20 caracteres - Hexadecimal
        const token = crypto.randomBytes(20).toString('hex');
        // Tempo de expiração do token
        const now = new Date();
        // Hora atual + 1 hora = Token terá 1 hora de duração a partir da hora atual
        now.setHours(now.getHours() + 1);
        // TESTANDO - RESET
        await User.findByIdAndUpdate(user.id,{
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });
        // Mailer enviando o email com novo token e senha
        mailer.sendMail({
            to: email,
            from: 'tacioantonio10@gmail.com',
            subject: 'Forgot Password',
            text: 'Novo token: {{ token }}',
            html: 
            `
                <h1>Password recovery</h1>
                <img src='https://api.unotelly.com/assets/v3/images/icon-lock.svg' style='position:relative;left:5%;width:150px;height:150px;'>
                <p>Novo token: ${ token }</p>
            `,
            // template: 'auth/forgot_password',
            context: { token },
        }, (err) => {
            if(err){
                return res.json({ success: false, message: 'Cannot send forgot password email', statusCode: 400 });
            }

            return res.send();
        });

    } catch(err) {
        // res.sendStatus(400).send({ error: 'Erro on forgot password, try again'})
        return res.json({ success: false, message: 'Erro on forgot password, try again', statusCode: 400 });
    }


});
// ROTA PARA RESETAR SENHA E FORNECER UMA NOVA
router.post('/reset_password', async (req, res) => {
    // Isso é o que é recebido da requisição
    const { email, token, password } = req.body;

    try {
        // Buscando o usuário
        const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires')

        // Verificando se o usuário existe
        if(!user){
            return res.json({ success: false, message: 'User not found', statusCode: 400 });
        }

        // Verificando se token mandado pela requisição coincide com o token fornecido pelo back-end
        if(token !== user.passwordResetToken){
            return res.json({ success: false, message: 'Token invalid', statusCode: 400 });
        }

        // Verificiando se o token expirou
        const now = new Date();

        if(now > user.passwordResetExpires){
            return res.json({ success: false, message: 'Token expired, generate a new one', statusCode: 400 });
        }

        // Atualizando o password do usuário, caso tenha passado pelas verificações
        user.password = password;
        
        await user.save();

        return res.send();
    } catch(err) {
        return res.json({ success: false, message: 'Cannot reset password, try again', statusCode: 400 });
    }
});

// Recuperando o app do express
// Retornando o app.use() e definindo uma rota '/auth' que chamará o router
// # Isso fará que o router seja utilizado dentro do app a partir de uma rota, 
// # que será usada como rota de cadastro, chamando a função de registro
// ## http://localhost:3001/auth/register
module.exports = app => app.use('/auth', router);
/* 
# Ambos são iguais
               // Recuperando o app do express
module.exports = (app) => {
    // Retornando o app.use() e definindo uma rota '/auth' que chamará o router
    // # Isso fará que o router seja utilizado dentro do app a partir de uma rota
    // ## http://localhost:3001/auth/register
    return app.use('/auth', router)
};
*/