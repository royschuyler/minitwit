'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');

router.use('/', home);

module.exports = router;
