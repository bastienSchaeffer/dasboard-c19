const request = require('supertest');
import {server} from '../../';

describe('GET /url', () => {
  it('responds with json', (done) => {
    request(server)
      .get('/url')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /world', () => {
  it('responds with json', (done) => {
    request(server)
      .get('/world')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /countries', () => {
  it('responds with json', (done) => {
    request(server)
      .get('/countries')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /timeline', () => {
  it('responds with json', (done) => {
    request(server)
      .get('/timeline')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /health', () => {
  it('responds with json', (done) => {
    request(server)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
