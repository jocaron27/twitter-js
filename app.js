const express = require('express');
const app = express();
const volleyball = require('volleyball');
app.use(volleyball);
const morgan = require('morgan');
morgan('tiny');
const nunjucks = require('nunjucks');
const http = require('http');
const server = http.createServer();
const PORT = 3000;
const tweetBank = require('./tweetBank');
const routes = require('./routes');



app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});
app.use('/', routes);

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.url} ${res.statusCode}`);
  next();
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});





