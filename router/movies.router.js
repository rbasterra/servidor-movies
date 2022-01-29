const express = require('express');
const moviesRouter = express.Router();
const Movie = require('../models/Movie');

moviesRouter.get('/', (_req,res,next)=>{
    return Movie.find()
        .then((movies)=>res.status(200).json(movies))
        .catch(err =>{
            error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

moviesRouter.get('/:id', (req,res,next) =>{
    const id = req.params.id;
    
    return Movie.findById(id)
        .then(movie => {
            if (!movie){
                error = new Error('Pelicula no encontrada');
                error.status=404;
                return next(error);
            }
            return res.status(200).json(movie);
        })
        .catch(err =>{
            error = new Error(err);
            error.status = 500;
            return next(error);
        });

});

moviesRouter.get('/titulo/:titulo', (req,res,next) => {
    const titulo = req.params.titulo;
    return Movie.findOne({title:titulo})
        .then(movie =>{
            if (!movie){
                error = new Error(`Pelicula con titulo ${titulo} no encontrada`);
                error.status=404;
                return next(error);
            }
            return res.status(200).json(movie);
        })
        .catch(err =>{
            error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

moviesRouter.get('/genero/:genero', (req,res,next) =>{
    const genero = req.params.genero;

    return Movie.find({genre:genero})
        .then(movies =>{
            if (!movies){
                error = new Error(`Peliculas del genero ${titulo} no encontradas`);
                error.status=404;
                return next(error);
            }
            return res.status(200).json(movies);
        })
        .catch(err =>{
            error = new Error(err);
            error.status = 500;
            return next(error);
        });

});

module.exports = moviesRouter;