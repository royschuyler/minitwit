'use strict';

var express = require('express')
var router = express.Router();

var ctrl = require('./controller');

router.post('/delete/:id', ctrl.delete_feature);

module.exports = router;
