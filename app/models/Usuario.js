const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.set('useCreateIndex', true);
const userSchema = mongoose.Schema({
    nome: {
        type: String,
        minlength: [2, 'O nome de ter no maximo 2 caracteres.'],
        required: [true, 'O nome deve ser preenchido.'],
        trim: true,
    },
    telefone: {
        type: String,
        min: 0,
        max:9
    },
    email: {
        type:String,
        trim:true,
    },
    senha: {
        type: String,
        select: false,
        minglength: 8,
        required: true
    },
    numero_m: {
        type: String  
    },
    autenticado:{
        type: String
    },
    datacadastro:{
        type: String,
    },
    createdAt:{
    type: Date,
    default: Date.now
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpire: {
        type: Date,
        select:false,
    },
  },
  {
    toJSON: {
        virtuals:true
    },
});

userSchema.pre('save', async function( next ) {
     const hash = await bcrypt.hash(this.senha, 10);
     this.senha = hash;
     next();
});
    
const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario;