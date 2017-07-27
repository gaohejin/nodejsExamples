/**
 * Created by FDD on 2017/7/27.
 */
var app = require('./index');
var request = require('supertest').agent(app.listen());

describe('Hello World', function() {
  it('should say "Hello World"', function(done) {
    request
      .get('/')
      .expect(200)
      .expect('Hello World', done);
  });
});