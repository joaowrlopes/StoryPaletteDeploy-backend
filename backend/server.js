const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// Carrega variáveis de ambiente
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
const MONGODB_URI = process.env.MONGO_DB;

if (!MONGODB_URI) {
  console.error('Erro: Variável de ambiente MONGO_DB não definida no arquivo .env.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
const booksRouter = require('./routes/books');
app.use('/api', booksRouter);

// Rota principal (Root)
app.get('/', (req, res) => {
  res.send('A API Story Palette List está rodando! Acesse http://localhost:5000/api/books para ver os livros.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor da API rodando na porta ${PORT}`);
});
