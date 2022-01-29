const express = require('express');
const db = require('./db');
// const PORT = 3000;
const server = express();
require('dotenv').config();

const PORT = process.env.PORT;

//Añadimos los middlewares para poder leer los body de las requests
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


db.connectDB().then(()=> {
    console.log('Conectado con base de datos Mongo');
    server.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`))
})
.catch(err => {
    error = new Error (err);
    console.log(`Error conectando con la base de datos: ${error}`);
});





