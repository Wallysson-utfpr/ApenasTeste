// conexão com o banco de dados

const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/dadosapi";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;

 