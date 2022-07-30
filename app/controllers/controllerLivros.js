const { Livro, Documento } = require("../models/Livro");

module.exports = {
  async UploadFile(req, res) {
    try {
      const { filename } = req.file;

      const resultLivro = await Documento.create({ doc: filename });
      return res.json(resultLivro);
    } catch (erro) {
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
      livro.recomedado = livro.recomedado.split(",").map((rec) => rec.trim());
      const resultLivro = await Livro.create(livro);
      return res.json({
        livro: resultLivro,
        mesagm: "Livro inserido com sucesso",
      });
    } catch (erro) {
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
      res.status(500).send(erro);
    }
  },
  async listarCategoria(req, res) {
    try {
      const {id} = req.params;
  
      const resultlivros = await Livro.find({ categoria: id })
        .populate("categoria", "categoria")
        .populate("documento", "doc -_id")
        .populate("autor", "nome -_id");  
    let livros = [];
    for (let i in resultlivros) {
      delete resultlivros[i].categoria;

      livros.push({
        _id: resultlivros[i]._id,
        recomedado: resultlivros[i].recomedado,

        nome_autor: resultlivros[i].autor.nome,
        autor_bibliografia: resultlivros[i].autor.bibliografia,
        autor_link: resultlivros[i].autor.link,
        autor_foto: resultlivros[i].autor.foto_autor,
        categoria: resultlivros[i].categoria.categoria,
        titulo: resultlivros[i].titulo,
        ano: resultlivros[i].ano,
        numero_pagina: resultlivros[i].numero_pagina,
        instituicao: resultlivros[i].instituicao,
        descricao: resultlivros[i].descricao,
        formato: resultlivros[i].formato,
        documento_url: resultlivros[i].documento.documento_url,
        usuario: resultlivros[i].usuario,
        capa_ul: resultlivros[i].capa_ul,
      });
    }


      if (livros.length >0) {
        res.json(livros); // HTTP 200 implícito
      } else {
        // HTTP 404: Not found
        res.status(404).end();
      }
    } catch (erro) {
      res.status(500).send(erro);
    }
  },

  async listarDocumento(req, res) {
    const resultdoc = await Documento.find();
    return res.json(resultdoc);
  },
  async listarTodos(req, res) {
    const resultlivros = await Livro.find({})
      .populate("categoria", "categoria")
      .populate("documento")
      .populate("autor", "-_id ");
      console.log(resultlivros);
    let livros = [];
    for (let i in resultlivros) {
      delete resultlivros[i].categoria;

      livros.push({
        _id: resultlivros[i]._id,
        recomedado: resultlivros[i].recomedado,

        nome_autor: resultlivros[i].autor.nome,
        autor_bibliografia: resultlivros[i].autor.bibliografia,
        autor_link: resultlivros[i].autor.link,
        autor_foto: resultlivros[i].autor.foto_autor,
        categoria: resultlivros[i].categoria.categoria,
        idCategoria: resultlivros[i].categoria._id,
        titulo: resultlivros[i].titulo,
        ano: resultlivros[i].ano,
        numero_pagina: resultlivros[i].numero_pagina,
        instituicao: resultlivros[i].instituicao,
        descricao: resultlivros[i].descricao,
        formato: resultlivros[i].formato,
        documento_url: resultlivros[i].documento.documento_url,
        usuario: resultlivros[i].usuario,
        capa_ul: resultlivros[i].capa_ul,
      });
      ///categoria:resultlivros[i].categoria.categoria,
    }
  
    return res.json(livros);
  },
  async listarTodosFiltro(req, res) {
    const { id }= req.params;
    const resultlivros = await Livro.find({_id: id})
      .populate("categoria", "categoria")
      .populate("documento")
      .populate("autor", "-_id ");

    let livros = [];
    for (let i in resultlivros) {
      delete resultlivros[i].categoria;

      livros.push({
        _id: resultlivros[i]._id,
        recomedado: resultlivros[i].recomedado,
        nome_autor: resultlivros[i].autor.nome,
        autor_id: resultlivros[i].autor._id,
        autor_bibliografia: resultlivros[i].autor.bibliografia,
        autor_link: resultlivros[i].autor.link,
        autor_foto: resultlivros[i].autor.foto_autor,
        categoria: resultlivros[i].categoria.categoria,
        categoria_id: resultlivros[i].categoria._id,
        titulo: resultlivros[i].titulo,
        ano: resultlivros[i].ano,
        numero_pagina: resultlivros[i].numero_pagina,
        instituicao: resultlivros[i].instituicao,
        descricao: resultlivros[i].descricao,
        formato: resultlivros[i].formato,
        documento_url: resultlivros[i].documento.documento_url,
        publicidade: resultlivros[i].publicidade,
        documento: resultlivros[i].documento._id,
        usuario: resultlivros[i].usuario,
        capa_ul: resultlivros[i].capa_ul,
      });

      ///categoria:resultlivros[i].categoria.categoria,
    }
  
    return res.json({livros});
  },

  async listarTodosMonografia(req, res) {
    const { id }= req.params;
    const resultlivros = await Livro.find({categoria: id})
      .populate("categoria", "categoria")
      .populate("documento")
      .populate("autor", "-_id ");
    let livros = [];
    for (let i in resultlivros) {
      delete resultlivros[i].categoria;

      livros.push({
        _id: resultlivros[i]._id,
        recomedado: resultlivros[i].recomedado,

        nome_autor: resultlivros[i].autor.nome,
        autor_bibliografia: resultlivros[i].autor.bibliografia,
        autor_link: resultlivros[i].autor.link,
        autor_foto: resultlivros[i].autor.foto_autor,
        categoria: resultlivros[i].categoria.categoria,
        titulo: resultlivros[i].titulo,
        ano: resultlivros[i].ano,
        numero_pagina: resultlivros[i].numero_pagina,
        instituicao: resultlivros[i].instituicao,
        descricao: resultlivros[i].descricao,
        formato: resultlivros[i].formato,
        documento_url: resultlivros[i].documento.documento_url,
        usuario: resultlivros[i].usuario,
        capa_ul: resultlivros[i].capa_ul,
      });

      ///categoria:resultlivros[i].categoria.categoria,
    }
  
    return res.json(livros);
  },


  async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      console.log(req.body)
      //const obj = await Livro.findByIdAndUpdate(id, req.body);
      /* if (obj) {
        // obj encontrado e atualizado
        // HTTP 204: No content
        res.status(204).end();
      } else {
        res.status(404).end();
      } */
    } catch (erro) {
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
      res.status(500).send(erro);
    }
  },
};
