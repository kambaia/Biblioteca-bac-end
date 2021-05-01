const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const autorSchema = mongoose.Schema({
    foto_autor: {
        type: String
    },
    nome: {
        type: String,
    },
    bibliografia: {
        type: String,
    },
    link:{
        type: String,
    },
    createdAt:{
    type: Date,
    default: Date.now
    }
});
    
const Autor = mongoose.model('Autor', autorSchema);

module.exports = Autor;