const assert = require('chai').assert;
const supertest = require('supertest');

describe('Server tests', () => {
    let server;

    beforeEach(() => {
	server = require('../server');
    });

    it('Should accept connections', (done) => {
	supertest(server)
	    .get('/')
	    .expect(200, done);
    });
});
