'use strict';

var mongo = require('mongodb').MongoClient;
var url = require('../../config/secrets').db;

var database;

module.exports.connect = function connect(cb) {
  mongo.connect(url, function (err, db) {
    database = db || null;
    cb(err, db);
  });
};

module.exports.getDb = function () {
  return database;
};
