const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const CollecaoLivro = mongoose.Schema(
  {
    capa: {
      type: String,
    },
    documento: { type: mongoose.Schema.Types.ObjectId, ref: "Documento" },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Autor",
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
    },
    recomedado: [String],
    tema: {
      type: String,
      required: true, // Atributo obrigatório
    },
    ano: {
      type: String,
      required: true,
    },
    numero_pagina: {
      type: String,
    },
    instituicao: {
      type: String,
    },
    formato: {
      type: String,
    },
    orientador: {
      type: String,
    },
    Descricao: {
      type: String,
    },
    favorito: {
      type: String,
    },
    codigo_identificacao: {
      type: Number,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
CollecaoLivro.virtual("capa_ul").get(function () {
  return `http://localhost/files/${this.capa}`;
});

const documentoSchema = mongoose.Schema(
  {
    doc: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
documentoSchema.virtual("documento_url").get(function () {
  return `http://localhost/doc/${this.doc}`;
});
/*
   Parâmetros de mongoose.model():
   1º -> o nome do modelo (entidade)
   2º -> a descrição da estrutura (esquema) da entidade
   3º -> o nome da coleção (collection) onde os objetos
      criados a partir do modelo serão armazenados no MongoDB
*/
const Livro = mongoose.model("Livro", CollecaoLivro);
const Documento = mongoose.model("Documento", documentoSchema);

module.exports = { Livro, Documento };
