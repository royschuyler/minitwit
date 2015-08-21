'use strict';

var expect = require('chai').expect;

var database = require('../../lib/mongo'),
    User = require('./User');


describe('User', () => {
  before(done => {
    database.connect(() => {
      var seedUsers = [
        { name : 'world' },
        { name : 'work' },
        { name : 'woman' }
      ];

      User.collection.insertMany( seedUsers,
        () => {
          done();
        });
    });
  });

  after((done) => {
    User.dropCollection(done);
  });

  describe('.findByPattern()', () => {
    it('should return an array', done => {
      User.findByPattern( 'any pattern',
        (err,matches) => {
          expect(matches).to.be.an('array');
          done();
        });
    });

    it('should should respond with matches', done => {
      User.findByPattern( 'wor',
        (err, matches) => {
          expect(matches).to.deep.equal([
            { name : 'world' },
            { name : 'work' }
          ]);
          done();
        });
    });
  });

});
