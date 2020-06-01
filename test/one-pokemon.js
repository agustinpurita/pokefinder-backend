const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:4000';

describe('Get one pokemon', () => {
    it('get info of 1 pokemon', (done) => {
        chai.request(url)
            .get('/api/pokemons/pikachu')
            .end(function(err, res) {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
});