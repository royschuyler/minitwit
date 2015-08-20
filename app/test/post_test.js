// var mocha = require('mocha')
var expect = require('chai').expect;

var Post = require('../models/post.js');
var mongo = require('../../lib/mongo/');

describe.only('Post', function () {

  before(function (done) {
    mongo.connect(done);
  });

  afterEach(function (done) {
    Post.dropCollection(done);
  });

  describe('findById', function () {
    var id = '55d4e64dc0102bc25450210e';
    before(function () {
      // create data
      var post = new Post({})
      post.save( function (err, post) {
        id = post._id
      });
    });

    it('should return a Post object', function (done) {

      Post.findById(id, function (err, post) {
        expect(post).to.be.an.instanceOf(Post);
        done();
      });
    });
    // obj.findById('55d4e64dc0102bc25450210e', function (err, post) {
    //   db.find({_id : ObjectID('55d4e64dc0102bc25450210e')}, function (err, post) {
    //     console.log(post)
    //     console.log(post.text)
    //     setPrototype(post.text).should.equal(result.text);
    //     db.close()
    //     done();
    //   })
    // })
  })
  describe('findAll', function () {
    var id = '55d4e64dc0102bc25450210e';
    before(function () {
      // create data
      var post = new Post({})
      post.save( function (err, post) {
        id = post._id
      });
    });
    it('should return an array of Post objects', function (done) {
      Post.findAll(function (err, postArray) {
        postArray.forEach(function (post) {
          expect(post).to.be.an.instanceOf(Post);
        })
        done();
      })
    })
  })

  describe('save', function () {
    it('should save an object to the database', function (done) {
      Post.collection.count(function (count) {
        var initialCount = count;
        // var id = '55d4e64dc0102bc25450210e';
        var post = new Post({})
        post.save(function (err, result) {
          Post.collection.count(function (err, result) {
            expect(result).to.equal(initialCount + 1);
            done();
          })
        })
      })
    })
  })

  // describe('delete', function () {
  //   it('should give a mongo document the hidden class', function (done) {

  //   } )
  // })

})








