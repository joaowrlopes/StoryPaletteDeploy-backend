const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Book = require('./models/Book');

const MONGODB_URI = process.env.MONGO_DB;

const harryPotterBooks = [
  {
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    genre: 'Fantasia',
    description: 'Um garoto órfão descobre que é um bruxo e é convidado a estudar na Escola de Magia e Bruxaria de Hogwarts.',
    publicationYear: 1997,
    coverUrl: 'https://m.media-amazon.com/images/I/81ibfYk4qmL._SY466_.jpg'
  },
  {
    title: 'Harry Potter e a Câmara Secreta',
    author: 'J.K. Rowling',
    genre: 'Fantasia',
    description: 'No segundo ano em Hogwarts, Harry descobre um mistério sombrio e ataques que estão petrificando os alunos.',
    publicationYear: 1998,
    coverUrl: 'https://m.media-amazon.com/images/I/81x1Fk4qU7L._SY466_.jpg'
  },
  {
    title: 'Harry Potter e o Prisioneiro de Azkaban',
    author: 'J.K. Rowling',
    genre: 'Fantasia',
    description: 'Um perigoso assassino foge da prisão de Azkaban e parece estar atrás de Harry Potter.',
    publicationYear: 1999,
    coverUrl: 'https://m.media-amazon.com/images/I/81x1Fk4qU7L._SY466_.jpg' // Placeholder, but okay
  },
  {
    title: 'Harry Potter e o Cálice de Fogo',
    author: 'J.K. Rowling',
    genre: 'Fantasia',
    description: 'Hogwarts sedia o perigoso Torneio Tribruxo, e Harry é misteriosamente selecionado para competir.',
    publicationYear: 2000,
    coverUrl: 'https://m.media-amazon.com/images/I/81x1Fk4qU7L._SY466_.jpg'
  },
  {
    title: 'Harry Potter e a Ordem da Fênix',
    author: 'J.K. Rowling',
    genre: 'Fantasia',
    description: 'O Lorde das Trevas retorna, mas o Ministério da Magia se recusa a acreditar e interfere em Hogwarts.',
    publicationYear: 2003,
    coverUrl: 'https://m.media-amazon.com/images/I/81x1Fk4qU7L._SY466_.jpg'
  },
  {
    title: 'Harry Potter e o Enigma do Príncipe',
    author: 'J.K. Rowling',
    genre: 'Fantasia',
    description: 'Harry descobre o passado de Voldemort através de memórias enquanto se prepara para a batalha final.',
    publicationYear: 2005,
    coverUrl: 'https://m.media-amazon.com/images/I/81x1Fk4qU7L._SY466_.jpg'
  },
  {
    title: 'Harry Potter e as Relíquias da Morte',
    author: 'J.K. Rowling',
    genre: 'Fantasia',
    description: 'A épica conclusão onde Harry, Rony e Hermione buscam e destroem as Horcruxes para derrotar Voldemort.',
    publicationYear: 2007,
    coverUrl: 'https://m.media-amazon.com/images/I/81x1Fk4qU7L._SY466_.jpg'
  }
];

const seedDB = async () => {
  try {
    if (!MONGODB_URI) {
      console.error('String de conexão MongoDB não encontrada no .env');
      process.exit(1);
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB para inserção de dados.');

    // Limpa a coleção atual de livros para evitar duplicação (opcional)
    // await Book.deleteMany({});
    // console.log('Coleção antiga de livros limpa.');

    await Book.insertMany(harryPotterBooks);
    console.log('Todos os 7 livros de Harry Potter foram inseridos com sucesso!');

    mongoose.connection.close();
  } catch (err) {
    console.error('Erro ao inserir os livros:', err);
    mongoose.connection.close();
  }
};

seedDB();
