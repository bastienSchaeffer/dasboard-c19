const request = require('supertest');
import {server} from '../../';

describe('GET /url', function () {
  it('responds with json', function (done) {
    request(server)
      .get('/url')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /world', function () {
  it('responds with json', function (done) {
    request(server)
      .get('/world')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /countries', function () {
  it('responds with json', function (done) {
    request(server)
      .get('/countries')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /timeline', function () {
  it('responds with json', function (done) {
    request(server)
      .get('/timeline')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /health', function () {
  it('responds with json', function (done) {
    request(server)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
