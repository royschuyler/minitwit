'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var should = require('chai').should();

var app = require('../../app/');
var database = require('../../lib/mongo');



describe('Mocha + Chai', function(){
	it('Truthyness', function(){
		true.should.equal(true);
	});
});







describe('deleting', function(){
  before(function(done){
    var users = [{name : 'Greg'}, {name : 'Chad'}];
    var message = {
      text : 'Hello World',
      username : 'Greg'
    };
    database.connect(function(err,db){
      db.collection('users').drop(function(){
        db.collection('users').insert(users, function(err){
          db.collection('tweets').drop(function(){
            db.collection('tweets').insert(message, function(err){
              done();
            });
          })
        });
      })
    })
  });

  //  delete test w/ authentication
  describe('POST /delete', function(){
    it('should respond with success', function(done){
      database.connect(function(err, db){
        db.collection('tweets').findOne({username : 'Greg'})
      })
      request(app)
      .post('/delete/:id')
      .expect(200)
      .end(function (err, req, res) {
        if (err) throw err;
        console.log(req)
        expect(req.session.user).to.be(true);
        expect(res.text).to.contain('Tweet deleted');
        done();
        });
    });
   });

  //  as user A deleting a tweet from User B profile
  describe('POST /delete/:id', function(){
  	it('should not delete the tweet', function(done){
      database.connect(function(err, db){
        db.collection('tweets').findOne({user : 'Chad'}, function(err, user){
      		request(app)
      			.post('/delete/:id')
      			.expect(403)
      			.end(function (err, res){
      				if (err) throw err;
      				expect(res.text).to.contain('Cannot delete another users tweet');
      				done();
      			});
          });
        })
      })
   });
});

