const config = require('../config');
const express = require('express');
const app = express();
const cors = require('cors');


// CONFIGS SERVER
app.set('port', config.app.port);


// MIDDLEWARES
app.use(cors());

// RUTAS SERVER
app.use('/api/pokemons', require('./routes/pokemons'));

// SERVER
async function main() {
    await app.listen(app.get('port'));
    console.log('server listening on port', app.get('port'));
}

main();