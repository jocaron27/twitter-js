const express = require( 'express' );
const app = express();
const http = require('http');
const server = http.createServer();
const PORT = 3000;
const volleyball = require('volleyball');
var morgan = require('morgan');

app.use(volleyball);

morgan('tiny');

app.use(function(req, res, next) {
    console.log(req.method + " " + req.url + " " + res.statusCode);
    if (req.url.split('/')[1] === ('special')) {
        console.log('you reached the special area.');
    }
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/news', function (req, res) {
    res.send('Hello World! : NEWS')
})

app.get('/special', function (req, res) {
    res.send('Hello World! : SPECIAL')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })



