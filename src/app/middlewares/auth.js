// Importando o módulo jwt
const jwt = require('jsonwebtoken');
// Importando o módulo authConfig
const authConfig = require('../../config/auth.json')
// Checa se o req e res estão ok, esse req e res estão vindo do projectController.js
module.exports = (req, res, next) => {
    // Buscar header de autenticação, lá dentro da requisição
    const authHeader = req.headers.authorization;
    // Checa se o token foi informado
    if(!authHeader){
        return res.json({ success: false, message: 'No token provided', statusCode: 401 });
    }
    // Token formato - Bearer hash
    // Separando token pelo espaço
    const parts = authHeader.split(' ');
    // Checando se o token possui duas partes
    if(!parts.length === 2){
        // return res.sendStatus(401).send({ error: 'Token error' })
        return res.json({ success: false, message: 'Token error', statusCode: 401 });
    }
    // Se tiver duas partes irá Destructor
    const [ scheme, token ] = parts;
    // Checando se está escrito Bearer em scheme
    // Regex - https://www.devmedia.com.br/iniciando-expressoes-regulares/6557
    if(!/^Bearer$/i.test(scheme)){
        // return res.sendStatus(401).send({ error: 'Token malformatted' })
        return res.json({ success: false, message: 'Token malformatted', statusCode: 401 });
    }
    // Verificação final do token
    // decoded - id do usuário
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        // Nesse ponto o usuário já informou um token
        // Caso ocorra um error no token
        if(err){
            // return res.sendStatus(401).send({ error: 'Token invalid' })
            return res.json({ success: false, message: 'Token invalid', statusCode: 401 });
        }
        // Incluir o userId nas próximas requisões do controller
        req.userId = decoded.id;

        // VAI PARA O PRÓXIMO PASSO QUE É O CONTROLLER
        // Caso não chame o next o usuário vai parar aqui
        // Com isso o middleware consegue interceptar o usuário
        return next();
    });
};