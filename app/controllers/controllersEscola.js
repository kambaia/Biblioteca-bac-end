const Matricula = require("../models/Estudantes");
module.exports = {
  async registrarMatricula(req, res) {
    try {
      const { matricula, escola } = req.body;
      let mat = await Matricula.findOne({
        escola,
        matricula,
      });
      if (!mat) {
        const obj = await Matricula.create(req.body);
        if (obj) {
          // obj foi encontrado
          res.json(obj); // HTTP 200 implícito
        } else {
          // HTTP 404: Not found
          res.status(404).end();
        }
      } else {
        return res
          .status(400)
          .json({ error: "O estudante já está cadastrado" });
      }
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  async listarUm(req, res) {
    try {
      const { matricula } = req.params;
      console.log(matricula);
      const obj = await Matricula.findOne({ matricula: matricula });
      if (obj) {
        // obj foi encontrado
        res.json(obj); // HTTP 200 implícito
      } else {
        // HTTP 404: Not found
        res.json(obj); // HTTP 200 implícito
      }
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  async listarTodos(req, res) {
    const resultMatricula = await Matricula.find({});
    return res.json(resultMatricula);
  },

  async deletarLivro() {
    try {
      const id = req.params.id;
      const obj = await Matricula.findByIdAndDelete(id);
      console.log(obj);
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
