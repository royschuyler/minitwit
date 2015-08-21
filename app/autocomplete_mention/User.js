'use strict';

var mongo = require('../../lib/mongo');

class User {
  constructor(u) {
    this.name = u.name;
  }

  static dropCollection(cb) {
    this.collection.drop(cb);
  }

  static findByPattern(pattern,cb) {
    this.collection.find({
      name : {$regex:pattern}
    },{
      name : 1 , _id : 0
    }).toArray((err,matches) => {
      cb(err,matches);
    });
  }
}

Object.defineProperty(User, 'collection', {
  get : () => mongo.getDb().collection('user')
});

module.exports = User;
