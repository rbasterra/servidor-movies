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
})

module.exports = moviesRouter;