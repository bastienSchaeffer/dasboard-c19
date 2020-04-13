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

describe('GET /timeseries', function () {
  it('responds with json', function (done) {
    request(server)
      .get('/timeseries')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /latestCountries', function () {
  it('responds with json', function (done) {
    request(server)
      .get('/latestCountries')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /dummyRedis', function () {
  it('responds with json', function (done) {
    request(server)
      .get('/dummyRedis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
