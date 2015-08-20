'use strict';

var database = require('../../lib/mongo/');
var ObjectID = require('mongodb').ObjectID;

module.exports.delete_feature = function delete_feature(req, res){
  database.connect(function(err, db){
    db.collection('tweets').findOne({_id: ObjectID(req.params.id)}, function (err, tweet){
      // req.session.user.name = 'Greg';
      if(tweet.username === 'Greg'){
        db.collection('tweets').update(tweet, {$set : {hidden : true}}, function(err, writeResult){
          if (err){
            res.send(err);
          }else{
            res.send(writeResult);
          }
        });
      }
    })
  })
}
