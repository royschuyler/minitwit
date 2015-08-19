'use strict';

module.exports.index = function index(req, res) {
  res.render('home/index');
};

module.exports.contact = function contact(req, res) {
  res.render('home/contact', {page: 'Contact'});
};
