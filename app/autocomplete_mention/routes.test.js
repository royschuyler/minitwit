'use strict';

var expect = require('chai').expect
  , request = require('supertest');

var app = require('../../app');

describe('Autocomplete', function() {
  describe('GET /mention/:pattern', function() {
    it('should respond with an array', function(done) {
      request(app)
        .get('/mention?pattern=wor')
        .expect(200)
        .end(function(err,res) {
          if(err) throw err;
          expect(res).to.be.an('array');
          done();
        });
    });
  });
});
