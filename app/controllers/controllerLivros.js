const { Livro, Documento } = require("../models/Livro");

module.exports = {
  livros(req, res) {
    res.send({
      msg: "Olá",
    });
  },
  async UploadFile(req, res) {
    try {
      const { filename } = req.file;

      const resultLivro = await Documento.create({ doc: filename });
      return res.json(resultLivro);
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  async CadastrarLivros(req, res) {
    try {
      const livro = req.body;
      const { filename } = req.file;
      const { id_usuario } = req.headers;
      livro.capa = filename;
      livro.usuario = id_usuario;
      const resultLivro = await Livro.create(livro);
      return res.json({
        livro: resultLivro,
        mesagm: "Livro inserido com sucesso",
      });
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  async listarUm(req, res) {
    try {
      const id = req.params.id;
      const obj = await Livro.findById(id)
        .populate("categoria", "categoria")
        .populate("documento")
        .populate("autor");
      if (obj) {
        // obj foi encontrado
        res.json(obj); // HTTP 200 implícito
      } else {
        // HTTP 404: Not found
        res.status(404).end();
      }
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  async listarCategoria(req, res) {
    try {
      const id = req.params.id;
      const obj = await Livro.find({ categoria: id })
        .populate("categoria", "categoria")
        .populate("documento", "doc -_id")
        .populate("autor", "nome -_id");
      if (obj) {
        // obj foi encontrado
        res.json(obj); // HTTP 200 implícito
      } else {
        // HTTP 404: Not found
        res.status(404).end();
      }
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },

  async listarDocumento(req, res) {
    const resultdoc = await Documento.find();
    return res.json(resultdoc);
  },
  async listarTodos(req, res) {
    const resultlivros = await Livro.find()
      .populate("categoria", "categoria")
      .populate("documento")
      .populate("autor", "-_id ").sort({tema: -1});
    return res.json(resultlivros);
  },

  async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const obj = await Livro.findByIdAndUpdate(id, req.body);
      if (obj) {
        // obj encontrado e atualizado
        // HTTP 204: No content
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  async Favoritar(req, res) {
    try {
      const id = req.params.id;
  
      const obj = await Livro.findByIdAndUpdate(id, req.body);
      if (obj) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  async Favoritos(req, res) {
    try {
      const id = req.params.id;
      const obj = await Livro.find({ usuario_favoritou: id }).populate("livro");
      if (obj) {
        res.json(obj); // HTTP 200 implícito
      } else {
        // HTTP 404: Not found
        res.status(404).end();
      }
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },

  async deletarLivro(req, res) {
    try {
      const id = req.params.id;
      const obj = await Livro.findByIdAndDelete(id);
      if (obj) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
};
