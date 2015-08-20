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
      text : 'HelloWorld',
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
  it('should respond with success', function(done){
    database.connect(function(err, db){
      db.collection('tweets').findOne({username : 'Greg'}, function(err, tweet){
        request(app)
        .post('/delete/'+tweet._id)
        .expect(200)
        .end(function (err, req, res) {
          if (err) throw err;
          // console.log(req)
          done();
        });
      })
    })
  });



  //  as user A deleting a tweet from User B profile
	it('should not delete the tweet', function(done){
    database.connect(function(err, db){
      db.collection('tweets').findOne({username : 'Chad'}, function(err, tweet){
    		request(app)
    			.post('/delete/' + tweet._id)
    			.expect(403)
    			.end(function (err, res){
    				if (err) throw err;
    				expect(res.text).to.contain('Cannot delete another users tweet');
    				done();
    			});
      });
    })
  })

  it('should not delete the tweet', function(done){
    database.connect(function(err, db){
      db.collection('tweets').findOne({username : 'Greg'}, function(err, tweet){
        request(app)
          .post('/delete/' + tweet._id)
          .expect(200)
          .end(function (err, res){
            if (err) throw err;
            expect(res.text).to.equal('{"ok":1,"nModified":0,"n":1}');
            done();
          });
      });
    })
  })

});


