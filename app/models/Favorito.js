const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const favoritoSchema = mongoose.Schema({
  favorito: {
    type: String,
  },
  livro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livro",
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Favorito = mongoose.model("favorito", favoritoSchema);

module.exports = Favorito;
