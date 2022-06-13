var conexao = require('../config/conexao');

var MoedaSchema = conexao.Schema({
    nome: { type: String },
    alta: { type: String },
    baixa: { type: String },
    foto: { type: String }

})

module.exports = conexao.model("Moeda", MoedaSchema);