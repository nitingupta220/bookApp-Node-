//import the modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import the schema 
const Book = require('./book.model');

//setting the database
const db = 'mongodb://localhost/bookData'

//connect the mongodb database
mongoose.connect(db);

//use body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



//retreiving the info from database
app.get('/', function (req, res) {
    res.send('Happy to be here!');
});


//find all Books
app.get('/books', function (req, res) {
    console.log('Getting all books!');
    Book.find({})
        .exec(function (err, books) {
            if (err) {
                res.send('error has occured');
            } else {
                console.log(books);
                res.json(books);
            }
        })
})

//find one book
app.get('/books/:id', function (req, res) {
    console.log('finding one book');
    Book.findOne({
            _id: req.params.id
        })
        .exec(function (err, books) {
            if (err) {
                console.log('error comes')
            } else {
                console.log(books)
                res.json(books);
            }
        })
})


//adding the book
app.post('/book', function (req, res) {
    const newBook = new Book();

    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;

    newBook.save(function (err, book) {
        if (err) {
            res.send('error adding book');
        } else {
            console.log(book);
            res.send(book);
        }
    })
});


//adding the book using another way
app.post('/book2', function (req, res) {
    Book.create(req.body, function (err, book) {
        if (err) {
            console.log('error adding the book2');
        } else {
            console.log(book);
            res.send(book);
        }
    })
})

//update the book
app.put('/book/:id', function (req, res) {
    Book.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                title: req.body.title
            }
        }, {
            upsert: true
        },
        function (err, newBook) {
            if (err) {
                console.log('error updating book');
            } else {
                console.log(newBook);
                res.status(204);
            }


        })
});

//remove a book
app.delete('/book/:id', function (req, res) {
    Book.findOneAndRemove({
        _id: req.params.id
    }, function (err, book) {
        if (err) {
            console.log('error deleting book');
        } else {
            console.log(book);
            res.status(204);
        }
    })
})

const port = 8080;

app.listen(port, function (req, res) {
    console.log('app started!');
});
