'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');
var post = require('./post/routes');
var autocomplete = require('./autocomplete_mention/routes');

router.use('/', home);
router.use('/', post);
router.use('/autocomplete', autocomplete);

module.exports = router;
