//import the modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create the schema
const BookSchema = new Schema({
    title: String,
    author: String,
    category: String
})

//export the schema
module.exports = mongoose.model('Book', BookSchema);