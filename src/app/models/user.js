/*  
    Model - É a camada para a manipulação de dados.
*/
// Importando o mongoose do databse que já está conectado e tem a referencia para o Promise
const mongoose = require('../../database');
// Importando o modulo bcrypt 
const bcrypt = require('bcryptjs');
// https://mongoosejs.com/docs/index.html
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, //Quando buscar usuários a senha não é visualizada
    },
    passwordResetToken: {
        type: String,
        select: false, 
    },
    passwordResetExpires: {
        type: Date,
        select: false, 
    },
    // Quando a conta foi criada
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
/* Bcrypt - O pre é uma função do mongoose que irá ser disparada antes de qualquer ação,
            e nesse momento irá encryptar a senha.
*/
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);
// Exportando User
module.exports = User;