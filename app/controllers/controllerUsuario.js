const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const authConfig = require('../../config/auth.json')

const Usuario = require("../models/Usuario");
module.exports = {
    Usuario(req, res) {
        res.send({
            msg: "Olá"
        })
    },
    async CadastrarUsuario(req, res) {
        const { email } = req.body;
        const dados = req.body;
        const dt = new Date();
        console.log(dados);
        
        const dataHoje = dt.toLocaleDateString();
        try {
            let usuario = await Usuario.findOne({ email: email });
            if (!usuario) {
                usuario = await Usuario.create(dados);
                usuario.senha = undefined;
                const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
                    expiresIn: 86400,
                })
                return res.status(201).json({ usuario, token });
            } else {
                console.log(usuario)
                return res.status(400).json({ error: "Usuário já está cadastrado" })
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: "Erro! Houve um erro ao cadastrar o usuário" });
        }
    },
    async autenticarUsuario(req, res) {
        console.log(req.body)
        try {
            const { email, senha } = req.body;
            console.log(typeof (req.body));

            let usuario = await Usuario.findOne({ email }).select('+senha')
            if (!usuario)
                return res.json({ message: "Nome de utilizador inválido." });
            if (!await bcrypt.compare(senha, usuario.senha))
                return res.json({ message: "Palavra-passe incorrectas." });
            usuario.senha = undefined;
            const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
                expiresIn: 86400,
            })
            res.json({ usuario, token });
            console.log(usuario)
        } catch (error) {
            return res.status(400).json({ error: "Usuário inválido" });
        }
    },
    visualizarUsuarios(req, res) {

    },
    atualizarUsuarios(req, res) {

    },
    deletarUsuarios(req, res) {

    }

}