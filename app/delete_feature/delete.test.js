'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var should = require('chai').should();


var app = require('../../app/');
var database = require('../../lib/mongo');
var Post = require('../post/Post');


describe('Mocha + Chai', function(){
	it('Truthyness', function(){
		true.should.equal(true);
	});
});


describe('deleting', function(){
  var seededUsers;
  var seededPosts;
  beforeEach(function(done){
    //save users Chad and Greg
    //and one tweet from each
    var users = [{name : 'Greg'}, {name : 'Chad'}];
    var posts = [{
      text : 'HelloWorld',
      username : 'Greg'
    }, {
      text : 'SupWorld',
      username : 'Chad'
    }];
    database.connect(function(err,db){
      db.collection('users').insert(users, function(err, result){
        seededUsers = result.ops;
        Post.collection.insert(posts, function(err, data){
          seededPosts = data.ops;
          done();
        });
      });
    });
  });

  after(function(done){
    database.connect(function(err, db){
      db.collection('users').drop(function(){
        Post.dropCollection(done);
      })
    })
  });

  //  test route w/ correct authentication
  it('should respond with success', function(done){
    database.connect(function(err, db){
      console.log(seededPosts[0]._id)
        request(app)
        .post('/delete/' + seededPosts[0]._id)
        .expect(200)
        .end(function (err, req, res) {
          if (err) throw err;
          done();
        });
    })
  });



  //  as userA deleting a tweet from userB profile
	it('should not delete the tweet', function(done){
    database.connect(function(err, db){
    		request(app)
    			.post('/delete/' + seededPosts[1]._id)
    			.expect(200)
    			.end(function (err, res){
    				if (err) throw err;
    				expect(res.text).to.contain('Error');
    				done();
    			});
    })
  })

  //  as userA deleting a tweet from userA profile
  it('should delete the tweet', function(done){
    database.connect(function(err, db){
        request(app)
          .post('/delete/' + seededPosts[0]._id)
          .expect(200)
          .end(function (err, res){
            if (err) throw err;
            expect(res.text).to.equal('{"ok":1,"nModified":1,"n":1}');
            done();
          });
    })
  })

});


