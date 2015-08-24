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

module.exports.setHidden = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    Post.setHidden(post, function (err, writeResult){
      if (err) { throw err; }
      res.redirect('/');
    });
  });
};

module.exports.show = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(post.hidden){
      res.redirect('/');
    }else{
      res.render('post/show', {post: post});
    }
  });
};
