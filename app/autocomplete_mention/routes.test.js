'use strict';

var expect = require('chai').expect
  , request = require('supertest');

var app = require('../../app');

describe('Autocomplete', function() {
  describe('GET /mention', function() {
    it('should send a response', function(done) {
      request(app)
        .get('/autocomplete/mention')
        .expect(200)
        .end(function(err,res) {
          if(err) return done(err);
          expect(res).to.exist;
          done();
        });
    });

    it('should respond with json', function(done) {
      request(app)
        .get('/autocomplete/mention?pattern=wor')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done);
    });

    var users = [
      { name : 'world' },
      { name : 'work' },
      { name : 'woman' },
    ];

    it('should respond with matches', function(done) {
      require('../../lib/mongo').connect(function(err,db) {
        db.collection('user').insert( users ,
          function(err,result) {
            if(err) throw err;
            request(app)   // seeking matches for wor
              .get('/autocomplete/mention?pattern=wor')
              .expect(200)
              .end(function(err, res) {
                if(err) return done(err);

                expect(res.text).to.contain('world');
                expect(res.text).to.contain('work');

                db.collection('user').remove( {},
                  function(err, result) {
                    if(err) throw err;
                    done();
                  });
              });
          });
      });
    });

    it('should not respond with not-matches', function(done) {
      require('../../lib/mongo').connect(function(err,db) {
        db.collection('user').insert( users ,
          function(err,result) {
            if(err) throw err;
            request(app)   // seeking matches for worl
              .get('/autocomplete/mention?pattern=worl')
              .expect(200)
              .end(function(err, res) {
                if(err) return done(err);

                expect(res.text).not.to.contain('work');

                db.collection('user').remove( {} ,
                  function(err, result) {
                    if(err) throw err;
                    done();
                  });
              });
          });
      });
    });

    it('should not have _id in response', function(done) {
      require('../../lib/mongo').connect(function(err,db) {
        db.collection('user').insert( users ,
          function(err,result) {
            if(err) throw err;
            request(app)   // seeking matches for worl
              .get('/autocomplete/mention?pattern=worl')
              .expect(200)
              .end(function(err, res) {
                if(err) return done(err);

                expect(res.text).not.to.contain('_id');

                db.collection('user').remove( {} ,
                  function(err, result) {
                    if(err) throw err;
                    done();
                  });
              });
          });
      });
    });
  });
});
