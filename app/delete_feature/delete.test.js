'use strict';

var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../app/');
var Post = require('../post/Post');
var database = require('../../lib/mongo/');


describe('deleting', function (){
  var seededPost;
  beforeEach(function (done){
    //and one tweet from each
    var post = {
      text : 'HelloWorld'
    };
    database.connect(function (){
      Post.collection.insert(post, function (err, data){
          seededPost = data.ops;
          done();
        });
    });
  });

  //drop collections after tests
  after(function (done){
      Post.dropCollection(done);
    });

  //  test route
  it('should respond with success', function (done){
        request(app)
        .post('/post/delete/' + seededPost[0]._id)
        .expect(200)
        .end(function (err) {
          if (err) throw err;
          done();
        });
      });

  //  adding hidden to a post
  it('should add hidden to the post', function (done){
      request(app)
        .post('/post/delete/' + seededPost[0]._id)
        .expect(200)
        .end(function (err){
          if (err) throw err;
          Post.findById(seededPost[0]._id, function (err, post){
            expect(post.hidden).to.equal(true);
            done();
          });
        });
    });
});


