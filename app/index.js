/* eslint-disable no-console */
'use strict';

var express = require('express');
var morgan = require('morgan');

var routes = require('./routes');
var posts = require('./post/post.routes');
var database = require('../lib/mongo/');
var bodyParser = require('body-parser');

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname);
app.set('view engine', 'jade');

app.locals.title = 'MiniTwit';

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/post', posts);

require('../lib/errorHandler/');

database.connect(onDbConnect);

function onDbConnect(err, db) {
  if (err) {
    console.error(`Database Connection Error. ${err}`);
  } else {
    console.log(`Database Connection Established at ${db.options.url}`);
    startNodeListener();
  }
}

function startNodeListener() {
  var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    var mode = app.get('env');

    console.log(`Server listening on port ${port} in ${mode} mode...`);
  });
}
