require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author');
const Genre = require('./models/Genre');

async function migrate() {
  try {
    console.log('Conectando ao MongoDB...');
    await mongoose.connect(process.env.MONGO_DB);
    console.log('Conectado!');

    const books = await mongoose.connection.db.collection('books').find().toArray();
    console.log(`Encontrados ${books.length} livros para migrar.`);

    for (let book of books) {
      console.log(`Processando livro: ${book.title}`);
      
      // 1. Processar Author
      let authorId = null;
      if (typeof book.author === 'string') {
        const authorName = book.author;
        let author = await Author.findOne({ name: { $regex: new RegExp('^' + authorName + '$', 'i') } });
        if (!author) {
          author = new Author({ name: authorName });
          await author.save();
          console.log(`  Novo autor criado: ${authorName}`);
        }
        authorId = author._id;
      } else {
        authorId = book.author;
      }

      // 2. Processar Genre
      let genreIds = [];
      if (typeof book.genre === 'string') {
        const genreName = book.genre;
        let genre = await Genre.findOne({ name: { $regex: new RegExp('^' + genreName + '$', 'i') } });
        if (!genre) {
          genre = new Genre({ name: genreName });
          await genre.save();
          console.log(`  Novo gênero criado: ${genreName}`);
        }
        genreIds.push(genre._id);
      } else if (Array.isArray(book.genre) && typeof book.genre[0] === 'string') {
        for (let gName of book.genre) {
          let genre = await Genre.findOne({ name: { $regex: new RegExp('^' + gName + '$', 'i') } });
          if (!genre) {
            genre = new Genre({ name: gName });
            await genre.save();
            console.log(`  Novo gênero criado: ${gName}`);
          }
          genreIds.push(genre._id);
        }
      } else {
         genreIds = book.genre;
      }

      // 3. Atualizar livro
      await mongoose.connection.db.collection('books').updateOne(
        { _id: book._id },
        { $set: { author: authorId, genre: genreIds } }
      );
      console.log(`  Livro atualizado!`);
    }

    console.log('Migração concluída com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro na migração:', error);
    process.exit(1);
  }
}

migrate();
