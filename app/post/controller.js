'use strict';

var Post = require('./Post');

module.exports.index = function (req, res) {
  Post.findAll(function (err, posts) {
    if (err) { throw err; }
    res.render('post/index', {posts: posts});
  });
};

module.exports.create = function (req, res) {
  Post.create(req.body, function (err) {
    if (err) { throw err; }
    res.redirect('/');
  });
};
