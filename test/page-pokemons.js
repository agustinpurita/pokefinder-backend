const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:4000';

const pageToEval = 1;
const pokesPerPage = 12;

describe('Get page pokemons', () => {
    it('get a list of all pokemons of 1 page', async() => {

        const response = await chai.request(url).get(`/api/pokemons/page/${pageToEval}?pokesPerPage=${pokesPerPage}`)

        expect(response).to.have.status(200);
        expect(response).to.be.json;


    })

});