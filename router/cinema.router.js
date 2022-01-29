const mongoose = require('mongoose');
const express = require('express');

const Cinema = require('../models/Cinema');

const cinemaRouter = express.Router();

cinemaRouter.get('/', (req,res,next) =>{
    let filter = {};

    if (req.query.name){
        filter = {...filter, name: req.query.name}
    }
    
    if (req.query.location){
        filter = {...filter, location:req.query.location}
    }

    Cinema.find(filter).populate('movies')
        .then(cinemas => {
            if (!cinemas.length > 0){
                error = new Error('Cines no encontrados');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(cinemas);
        })
        .catch(err =>{
            error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

cinemaRouter.post('/',(req,res,next) =>{
    Cinema.find({name:req.body.name})
        .then(cinema => {
            if (cinema.length > 0){
                error = new Error(`Cine ${req.body.name} ya existe`);
                next(error);
            }

            let movies = [];
            if (req.body.movies){
                movies = req.body.movies
            }
            const newCinema = new Cinema({
                name: req.body.name,
                location: req.body.location,
                movies: movies
            })

            newCinema.save()
                .then(() => res.status(201).json(newCinema))
                .catch(err =>{
                    const error = new Error(err);
                    error.status = 500;
                    return next(error);
                });
        })
        .catch(err =>{
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

cinemaRouter.put('/:id', (req,res,next) =>{
    const id = req.params.id;

    Cinema.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        .then(cinema => {
            if (!cinema){
                error = new Error('Cine no encontrado');
                error.status=404;
                return next(error);
            }
            return res.status(200).json(cinema)
        })
        .catch(err =>{
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

cinemaRouter.delete('/:id',(req,res,next) =>{
    const id = req.params.id;

    Cinema.findByIdAndDelete(id)
        .then(() => res.status(200).json(`Cine con id ${id} eliminado`))
        .catch(err =>{
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
})

module.exports = cinemaRouter;