'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

router.post('/:id', ctrl.setHidden);

module.exports = router;
