const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:4000';

describe('Get all pokemons', () => {
    it('get a list of all pokemons', (done) => {
        chai.request(url)
            .get('/api/pokemons')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
});