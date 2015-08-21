'use strict';

var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../app/');
var database = require('../../lib/mongo');
var Post = require('../post/Post');


describe('deleting', function (){

  var seededPosts;
  beforeEach(function (done){
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
    database.connect(function (err,db){
      db.collection('users').insert(users, function (){
        Post.collection.insert(posts, function (err, data){
          seededPosts = data.ops;
          done();
        });
      });
    });
  });

  //drop collections after tests
  after(function (done){
    database.connect(function (err, db){
      db.collection('users').drop (function (){
        Post.dropCollection(done);
      });
    });
  });

  //  test route w/ correct authentication
  it('should respond with success', function (done){
    request(app)
    .post('/delete/' + seededPosts[0]._id)
    .expect(200)
    .end(function (err) {
      if (err) throw err;
      done();
    });
  });

  //  as userA deleting a tweet from userB profile
  it('should not add hidden to the post', function (done){
    request(app)
			.post('/delete/' + seededPosts[1]._id)
			.expect(200)
			.end(function (err, res){
        if (err) throw err;
        expect(res.text).to.contain('Error');
        done();
      });
  });

  //  as userA deleting a tweet from userA profile
  it('should add hidden to the post', function (done){
    request(app)
      .post('/delete/' + seededPosts[0]._id)
      .expect(200)
      .end(function (err){
        if (err) throw err;
        Post.findById(seededPosts[0]._id, function (err, post){
          expect(post.hidden).to.equal(true);
          done();
        });
      });
  });
});


