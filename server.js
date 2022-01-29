const express = require('express');
const db = require('./db');
// const PORT = 3000;
const server = express();
const moviesRouter=require('./router/movies.router');
const cinemaRouter=require('./router/cinema.router');


require('dotenv').config();
const PORT = process.env.PORT;

//Añadimos los middlewares para poder leer los body de las requests
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get('/',(_req,res)=>res.status(200).send('Server is up & running'));

server.use('/movies',moviesRouter);
server.use('/cinema', cinemaRouter);

// Uso el guion bajo para indicar que los parametros no se usan dentro del errorHandler
server.use((err, _req, res, _next) => {
    return res
        .status(err.status || 500)
        .json(err.message || 'Error inesperado en servidor');
});


db.connectDB().then(()=> {
    console.log('Conectado con base de datos Mongo');
    server.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`))
})
.catch(err => {
    error = new Error (err);
    console.log(`Error conectando con la base de datos: ${error}`);
});





