'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var should = require('chai').should();

var app = require('../app/');



describe('Mocha + Chai', function(){
	it('Truthyness', function(){
		true.should.equal(true);
	});
});

describe('delete w/o authentication', function() {
	describe('POST /delete', function(){
	  it('should respond with error', function(done){
	  	request(app)
	  	.post('/delete')
	  	.expect(401)
	  	.end(function (err, res) {
	  		if (err) throw err;
	  		expect(res.text).to.contain('You are not logged in');
	  		done();
         });
	  });
   });
});