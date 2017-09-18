const express = require( 'express' );
const app = express();


const http = require('http');

const server = http.createServer();

const PORT = 3000;

// app.use(function(req, res, next) {
//     console.log(req.url);
//     next();
//   });

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/news', function (req, res) {
    res.send('Hello World! : NEWS')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })



