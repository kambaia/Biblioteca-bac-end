const Categoria = require("../models/Categoria");
module.exports = {
    async categoria(req, res) {
        res.send({
            msg: "Olá"
        })
    },
    async CadastrarCategoria(req, res) {
        const categoria = req.body;
        let resultcategoria = await Categoria.find(categoria);
        if(resultcategoria.length >0){
            return  res.json({message: 'Eroo, está categória já se encontar cadastrada!'})
         }else{
            resultcategoria = await Categoria.create(categoria);
            return res.json(resultcategoria)
         }  
    },
    async listarUm(req, res) {
        try {
            const id = req.params.id;
            const obj = await Categoria.findById(id)
            if (obj) { // obj foi encontrado
               res.json(obj) // HTTP 200 implícito
            }
            else {
               // HTTP 404: Not found
               res.status(404).end()
            }
        }
        catch (erro) {
           console.log(erro)
           res.status(500).send(erro)
        }
    },
   async listarTodos(req, res) {
        const resultcategoria = await Categoria.find({});
        return res.json(resultcategoria)
    },
    async atualizarLivro() {
        try {
            const id = req.params.id;
            console.log(id);
            const obj = await Categoria.findByIdAndUpdate(id, req.body)
            if (obj) { // obj encontrado e atualizado
               // HTTP 204: No content
               res.status(204).end()
            }
            else {
               res.status(404).end()
            }
         }
         catch (erro) {
            console.log(erro)
            res.status(500).send(erro)
         }
    },
    async deletarLivro() {
        try {
           const id = req.params.id;
           const obj = await Categoria.findByIdAndDelete(id);
           console.log(obj)
           if (obj) {
              res.status(204).end()
           }
           else {
              res.status(404).end()
           }
        }
        catch (erro) {
           res.status(500).send(erro)
        }
    }
}