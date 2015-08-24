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

  //  adding hidden to a post
  it('should add hidden to the post', function (done){
      request(app)
        .delete('/post/' + seededPost[0]._id)
        .expect(302)
        .end(function (err){
          if (err) throw err;
          request(app)
            .get('/post/' + seededPost[0]._id)
            .expect(302)
            .end(function (err){
              if (err) throw err;
              request(app)
                .get('/')
                .end(function (err, res){
                  expect(res.text).to.not.contain(seededPost[0].text);
                  done();
                });
            });
        });
    });
});


