'use strict';

var User = require('./User');

module.exports.mention = (req,res) => {
  var p = req.query.pattern;
  User.findByPattern( p,
    (err,matches) => {
      if(err) throw err;
      res.send(matches);
    });
};
