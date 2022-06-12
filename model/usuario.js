var conexao = require('../config/conexao');

var UsuarioSchema = conexao.Schema({
    nome: { type: String },
    alta: { type: String },
    baixa: { type: String },
    foto: { type: String }

})

module.exports = conexao.model("Usuario", UsuarioSchema);