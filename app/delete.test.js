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


//  delete test w/o authentication

describe('delete w/o authentication', function() {
	describe('POST /delete', function(){
	  it('should respond with error', function(done){
	  	request(app)
	  	if(!user){
	  	.post('/delete')
	  	.expect(401)
	  	.end(function (err, res) {
	  		if (err) throw err;
	  		expect(res.text).to.contain('You are not logged in');
	  		done();
          });
	    }
	  });
   });
});

//  as user A deleting a tweet from User B profile

descibe('deleting another users tweet', function(){
  describe('POST /delete/tweet_id', function(){
  	it('should not delete the tweet', function(done){
  		request(app)
  		if(tweet.userID !== userA._id){
  			.post('/delete/:id')
  			.expect(403)
  			.end(function (err, res){
  				if (err) throw err;
  				expect(res.text).to.contain('Cannot delete another users tweet');
  				done();
  			});
  		 }
      });
   });
});

