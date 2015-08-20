'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

router.get('/', ctrl.index);
router.post('/', ctrl.create);

module.exports = router;
