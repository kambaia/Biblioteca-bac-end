const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const estudanteSchema = mongoose.Schema({
    nome: {
        type: String,
    },
    escola: {
        type: String,
    },
    matricula: {
        type: String,
    },
    createdAt:{
    type: Date,
    default: Date.now
    }
});
    
const escola = mongoose.model('escola', estudanteSchema);

module.exports = escola;