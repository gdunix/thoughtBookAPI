const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../server.js');

describe('Main', () => {
    it('Returns Succes on Health-Check', (done) => {
        chai.request(app)
            .get('/api/health-check')
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(200);
                done();
            });
    });
});