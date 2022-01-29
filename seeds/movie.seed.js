const mongoose = require('mongoose');
const db = require('../db');
const Movie = require('../models/Movie');

const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción',
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción',
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación',
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación',
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción',
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica',
  },
];

// Creamos los documentos por cada peli del array movies
const movieDocs = movies.map(movie => new Movie(movie));

// conectamos con la base de datos. 
db.connectDB()
    // Cuando se conecte, verificamos si existen ya datos. Si existen, los eliminamos
    .then(async ()=>{
        const allMovies = await Movie.find();

        if (allMovies.length > 0){
            await Movie.collection.drop();
        }


    })
    .catch(err => console.error (`Error eliminando informacion de la DB: ${err}`))

    // Añadimos los elementos a la BBDD
    .then(async () => await Movie.insertMany(movieDocs))
    .catch(err =>console.error(`Error creando doucmentos en DB: ${err}`))
    .finally(() => mongoose.disconnect());