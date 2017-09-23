const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
// const tweetBank = require('../tweetBank');
const client= require("../db/index.js");



router.get('/', function (req, res, next) {
  client.query('SELECT users.name, tweets.content, tweets.id FROM users INNER JOIN tweets ON users.id = tweets.user_id', function (err, result) {
    if (err) return next(err); // pass errors to Express
    let tweets = result.rows;
    res.render('index', { tweets: tweets, showForm: true });
  });
});

router.get('/users/:name', function(req, res) {
  client.query('SELECT users.name, tweets.content, tweets.id from tweets INNER JOIN users ON users.id = tweets.user_id', function (err, result) {
    if (err) return next(err); // pass errors to Express
    let tweetsWithName = result.rows.filter(function(el) { return (el.name === req.params.name)});
    res.render('index', { tweets: tweetsWithName });
  });
});

router.get('/tweets/:id', function(req, res) {
  client.query('SELECT users.name, tweets.content, tweets.id FROM tweets INNER JOIN users ON users.id = tweets.user_id', function (err, result) {
    if (err) return next(err); // pass errors to Express
    let tweetsWithId = result.rows.filter(function(el) { return (el.id == req.params.id)});
    res.render('index', { tweets: tweetsWithId });
  });
});

router.post('/tweets', function(req, res, next) {
  var name = req.body.name;
  var text = req.body.text;
  client.query('SELECT * FROM users WHERE name = $1', [name], function(err,result){
    if(err) res.status(500).send(err);
    if (result.rows.length) {
      insertTweet(result.rows[0], text);
    } else {
      let pictureURL = "http://lorempixel.com/48/48/?name=" + name;
      client.query('INSERT INTO users (name, picture_url) VALUES ($1, $2) RETURNING *', [name, pictureURL], function(err, createdUser) {
        if (err) res.status(500).send(err);
      });
      insertTweet(createdUser.rows[0], text);
    }
     
  })
  
  function insertTweet(user, tweet) {
    client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING *', [user.id, tweet], function(err, result) {
    if (err) return next(err);
    res.redirect('/');
    });
  }
})


module.exports = router;