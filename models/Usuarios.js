const mongoose = require('mongoose');

const Usuarios = new mongoose.Schema({
    googleID: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    registro: {
        type: Date,
        defautl: Date.now
    }
});

module.exports = mongoose.model('Usuarios', Usuarios);