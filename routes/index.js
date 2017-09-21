const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');


router.get('/', function (req, res, next) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets , showForm: true });
  res.sendFile('/stylesheets/style.css');
});

router.get('/users/:name', function(req, res) {
  let tweetsWithName = tweetBank.find( {name: req.params.name});
  res.render( 'index', { tweets: tweetsWithName } );
  res.sendFile('/stylesheets/style.css');
});

router.get('/tweets/:id', function(req, res) {
  let tweetsWithId = tweetBank.find( {id: parseInt(req.params.id)});
  res.render( 'index', { tweets: tweetsWithId } );
  res.sendFile('/stylesheets/style.css');
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
})

module.exports = router;