const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

const booksRoutes = require('./api/routes/knjige');

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/Biblioteka",{
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json({}));

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods',
         'OPTIONS, GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }

    next();
})

app.use('/knjige', booksRoutes);

app.use(function(req,res,next){
    const error = new Error('Zahtev nije podrzan');
    error.status = 405;

    next(error);
});

app.use(function(error, req, res, next){
    res.status(error.status || 500).json({
        greska: {
            poruka: error.message
        }
    });
});

module.exports = app;