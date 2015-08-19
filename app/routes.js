'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');
var autocomplete = require('./autocomplete_mention/routes');

router.use('/', home);
router.use('/autocomplete', autocomplete);


module.exports = router;
