const {Livro, Documento} = require("../models/Livro");

module.exports = {
    livros(req, res) {
        res.send({
            msg: "Olá"
        })
    },
    async UploadFile(req, res) {
        try {
            const { filename } = req.file;
            console.log(filename)
            const resultLivro = await Documento.create({doc:filename});
            return res.json(resultLivro);   
        }
        catch (erro) {
        console.log(erro)
        res.status(500).send(erro)
     }

},
    async CadastrarLivros(req, res) {
        try {
            const livro = req.body;
            const { filename } = req.file;
            const { id_usuario } = req.headers;
            livro.capa = filename;
            livro.usuario = id_usuario;
            livro.recomedado = livro.recomedado.split(',').map(rec=>rec.trim());
            console.log(livro);
             const resultLivro = await Livro.create(livro);
             return res.json(resultLivro);   
        }catch (erro) {
                console.log(erro)
                res.status(500).send(erro)
             }
        
    },
   async listarUm(req, res) {
        try {
            const id = req.params.id;
            const obj = await Livro.findById(id).populate('categoria', 'categoria').populate('documento').populate('autor', 'nome -_id ');
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
    async listarCategoria(req, res) {
      try {
          const id = req.params.id;
          const obj = await Livro.find({categoria:id}).populate('categoria', 'categoria').populate('documento', 'doc -_id').populate('autor', 'nome -_id');
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
  
    async listarDocumento(req, res) {
        const resultdoc = await Documento.find();
        return res.json(resultdoc);
    },
    async listarTodos(req, res) {
        const resultlivros = await Livro.find().populate('categoria', 'categoria').populate('documento').populate('autor', 'nome -_id ');
        return res.json(resultlivros)
    },
   async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            console.log(id);
            const obj = await Livro.findByIdAndUpdate(id, req.body)
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
    async deletarLivro(req, res) {
        console.log(req.params.id)
        try {
           const id = req.params.id;
           const obj = await Livro.findByIdAndDelete(id);
           console.log(obj)
           if (obj) {
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
    }

}