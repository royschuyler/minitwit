'use strict';

var database = require('../../lib/mongo/');
var Post = require('../post/Post');
var ObjectID = require('mongodb').ObjectID;

module.exports.setHidden = function (req, res){
  database.connect(function(err, db){
    Post.findById(req.params.id, function (err, post){
      // req.session.user.name = 'Greg';
      if(post.username === 'Greg'){
        db.collection('posts').update(post, {$set : {hidden : true}}, function(err, writeResult){
          console.log(post);
          if (err){
            res.send(err);
          }else{
            res.send(writeResult);
          }
        });
      }else{
        res.send('Error');
      }
    })
  })
}
