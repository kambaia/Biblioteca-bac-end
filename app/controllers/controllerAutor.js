const Autor = require("../models/Autor");

module.exports = {
  livros(req, res) {
    res.send({
      msg: "Olá",
    });
  },
  async CadastrarAutor(req, res) {
    const autor = req.body;
    const { filename } = req.file;
    autor.foto_autor = filename;
    const resultAutor = await Autor.create(autor);
    return res.json(resultAutor);
  },
  async listarUm(req, res) {
    try {
      const id = req.params.id;
      const resultAutor = await Autor.findById(id);
      if (resultAutor) {
        // obj foi encontrado
        res.send(resultAutor); // HTTP 200 implícito
      } else {
        // HTTP 404: Not found
        res.status(404).end();
      }
    } catch (erro) {
      res.status(500).send(erro);
    }
  },
  async listarTodos(req, res) {
    try {
      // find(), sem parâmetros, retorna todos
      // O parâmetro de populate() é o *ATRIBUTO* relacionado
      const lista = await Autor.find();
      res.status(200).json(lista); // HTTP 200 implícito
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({
          error: error,
          erro: "Ocorreu um erro, colegios não encontrado",
        });
    }
  },
  async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const obj = await Autor.findByIdAndUpdate(id, req.body);
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
  async deletarLivro(req, res) {
    console.log(req.params.id);
    try {
      const id = req.params.id;
      const obj = await Autor.findByIdAndDelete(id);
      console.log(obj);
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
