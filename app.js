const express = require('express');
const app = express();
const volleyball = require('volleyball');
const morgan = require('morgan');
const logger = morgan('dev');
const nunjucks = require('nunjucks');
const http = require('http');
const server = http.createServer();
const PORT = 3000;
const tweetBank = require('./tweetBank');
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(volleyball);
app.use(logger);
app.use(express.static('public'));
app.use(routes);
app.use('/users/:name', routes);
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.url} ${res.statusCode}`);
  next();
});

nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render);


app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});





