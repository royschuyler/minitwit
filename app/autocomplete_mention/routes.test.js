'use strict';

var request = require('supertest');

var app = require('../../app'),
    database = require('../../lib/mongo');

describe('Autocomplete', () => {
  describe('GET /mention', () => {

    before(done => { // add users to user collection in db
      var users = [
        { name : 'world' },
        { name : 'work' },
        { name : 'woman' }
      ];
      database.connect((err,db) => {
        db.collection('user').drop( // but clear collection first
          () => {
            db.collection('user').insert( users ,
              err => {
                if(err) throw err;
                done();
              });
          });
      });
    });

    it('should send an empty array when there\'s no query', done => {
      request(app)
        .get('/autocomplete/mention')
        .expect(200)
        .expect([])
        .end(err => {
          if(err) throw err;
          done();
        });
    });

    it('should respond with json', done => {
      request(app)
        .get('/autocomplete/mention?pattern=wor')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done);
    });

    it('should respond with matches and not with non-matches', done => {
      request(app)   // seeking matches for wor
        .get('/autocomplete/mention?pattern=wor')
        .expect(200)
        .expect([ {name: 'world'}, {name: 'work'} ])
        .end(err => {
          if(err) throw err;
          done();
        });
    });

    after(done => {
      database.connect((err,db) => {
        db.collection('user').drop(
          err => {
            if(err) throw err;
            done();
          });
      });
    });
  });
});
