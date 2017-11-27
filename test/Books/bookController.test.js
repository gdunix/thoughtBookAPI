const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

const app = require('../../server.js');

describe('Books', () => {
    it('Returns all Books - Status 200', (done) => {
        chai.request(app)
            .get('/api/books')
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(200);
                done();
            });
    });

    it('Returns all Books - Body', (done) => {
        chai.request(app)
            .get('/api/books')
            .end((error, res) => {
                if (error) done(error);
                // Now let's check our response
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});

