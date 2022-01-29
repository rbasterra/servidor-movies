const mongoose = require('mongoose');
require('dotenv').config();
const DB_PWD = process.env.DB_PWD;


const DB_URL = `mongodb+srv://root:${DB_PWD}@cluster0.y80ou.mongodb.net/cinema?retryWrites=true&w=majority`;

const connectDB = ()=> mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

module.exports =   { connectDB };


