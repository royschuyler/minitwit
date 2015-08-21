'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');

router.get('/', ctrl.index);
router.post('/post', ctrl.create);
router.get('/post/:id', ctrl.show);
router.post('/post/delete/:id', ctrl.setHidden);

module.exports = router;
