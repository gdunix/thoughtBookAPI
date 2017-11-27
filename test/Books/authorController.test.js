const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
let Author = require('../../models/Books/authorModel');
const app = require('../../server.js');

describe('Authors', () => {
    beforeEach((done) => {
        Author.remove({}, (err) => { 
           done();         
        });     
    });
    describe('/POST author', () => {
        it('it post an author', (done) => {
          let author = {
              name: 'James Worthy'
          }
          chai.request(app)
              .post('/api/author')
              .send(author)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                done();
              });
        });
  
    });

    it('/GET all authors', (done) => {
        chai.request(app)
            .get('/api/authors')
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