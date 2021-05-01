const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const categoriaSchema = mongoose.Schema({
    categoria: {
        type: String,
    },
    createdAt:{
    type: Date,
    default: Date.now
    }
});
    
const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;