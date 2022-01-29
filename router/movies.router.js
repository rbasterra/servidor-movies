const express = require('express');
const moviesRouter = express.Router();
const Movie = require('../models/Movie');

moviesRouter.get('/', (req,res,next)=>{

    let filtro={};

    if (req.query.titulo){
        filtro = {...filtro, title:req.query.titulo}
    }

    if (req.query.anno){
        filtro = {...filtro, year: {$gte:req.query.anno}}
    }

    return Movie.find(filtro)
        .then(movies => {
            if (!movies.length > 0){
                error = new Error('Pelicula(s) no encontrada(s)');
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

moviesRouter.get('/fecha/:anno', (req,res,next) =>{
    const anno = Number(req.params.anno);

    return Movie.find({year: {$gte: anno}})
        .then(movies =>{
            if (!movies){
                error = new Error(`Peliculas a partir del año ${anno} no encontradas`);
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

moviesRouter.post('/', (req,res,next) => {
   
   return Movie.find({title: req.body.title})
        .then(movies =>{
            if (movies.length > 0){
                error = new Error (`La pelicula ${req.body.title} ya existe en la BBDD`);
                return next(error);
            }
            const newMovie = new Movie({
                title: req.body.title,
                director: req.body.director,
                year: req.body.year,
                genre: req.body.genre
            });

            newMovie.save()
                .then(() => res.status(201).json(newMovie))
                .catch(err =>{
                    const error = new Error(err);
                    error.status = 500;
                    return next(error);
                });

        })
        .catch(err =>{
            error = new Error(err);
            error.status = 500;
            return next(error);
        });
      
});

moviesRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    
    Movie.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        .then(movie => {
            if (!movie){
                error = new Error('Pelicula no encontrada');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(movie)
        })
        .catch(err =>{
            error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

moviesRouter.delete('/:id', (req, res, next) =>{
    const id = req.params.id;

    Movie.findByIdAndDelete(id)
        .then(() => res.status(200).json(`Pelicula con id ${id} eliminada`))
        .catch(err =>{
            error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

module.exports = moviesRouter;