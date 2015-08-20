'use strict';

var database = require('../../lib/mongo/');

module.exports.mention = function mention(req,res) {
  database.connect(function(err,db){
    if(err) throw err;
    var query = req.query.pattern;
    db.collection('user').find({
      name : {$regex:query}
    }, {
      name : 1 , _id : 0
    }).toArray(function(err,matches) {
      res.send(matches);
    });
  });
};
