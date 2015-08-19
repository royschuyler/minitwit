'use strict';

var express = require('express');
var sassCSS = require('node-sass-middleware');
require('babel/register');
require('./app/');

var app = express();

app.use(sassCSS('www/stylesheets'));
