'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');
var delete_feature = require('./delete_feature/routes');

router.use('/', home);
router.use('/delete', delete_feature);

module.exports = router;
