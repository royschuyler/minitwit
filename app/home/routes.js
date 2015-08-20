'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

router.get('/contact', ctrl.contact);

module.exports = router;
