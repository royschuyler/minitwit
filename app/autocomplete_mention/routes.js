'use strict';

var express = require('express')
  , router = express.Router();

var ctrl = require('./controller');

router.get('/mention', ctrl.mention);

module.exports = router;
