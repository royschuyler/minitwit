'use strict';

var express = require('express');
var router = express.Router();

var Post = require("./Post");

router.get('/', function (req, res) {
  res.render('post/index');
});

router.post('/', function (req, res) {
  var postObj = {
    text : req.body.text
  };
  var post = new Post(postObj);
  post.save(function (err, result) {
    if (err) {throw err};
    res.redirect('/');
  });

});

module.exports = router;
