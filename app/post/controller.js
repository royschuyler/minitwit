'use strict';

var Post = require('./Post');

module.exports.index = function (req, res) {
  res.render('post/index');
};

module.exports.create = function (req, res) {
  Post.create(req.body, function (err) {
    if (err) { throw err; }
    res.redirect('/');
  });
};
