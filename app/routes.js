'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');
var delete_feature = require('./delete_feature/routes');
var post = require('./post/routes');

router.use('/', home);
router.use('/', post);
router.use('/delete', delete_feature);


module.exports = router;
