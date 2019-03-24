// Necessita que o usuário esteja logado para fazer a autenticação
// Importando o express porque é necessário mexer em rotas
const express = require('express');
// Importando a rota do módulo do express e armazenando em uma constante
const router = express.Router();
// Importando o módulo middleware/auth
const authMiddleware = require('../middlewares/auth');
// Testadno o authMiddleware
router.use(authMiddleware);
// Checa se está funcionando a autenticação
router.get('/', (req, res) => {
    res.send({ ok: true, user: req.userId });
});
// Recuperando o app do express
// Retornando o app.use() e definindo uma rota '/projects' que chamará o router
// # Isso fará que o router seja utilizado dentro do app a partir de uma rota
module.exports = app => app.use('/projects', router);
