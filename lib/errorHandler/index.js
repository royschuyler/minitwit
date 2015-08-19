'use strict';

var app = require('../../app/');
var handleInternalServerErrors = require('./lib/internalServer');
var handleNotFoundErrors = require('./lib/notFound');

app.use(handleNotFoundErrors());
app.use(handleInternalServerErrors());
