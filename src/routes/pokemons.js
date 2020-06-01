const rp = require('request-promise');
const { Router } = require('express');
const router = Router();


// RUTA PARA OBTENER UN ARRAY CON TODOS LOS POKEMONS DISPONIBLES EN LA API(POKEAPI)
router.route('/')
    .get(async(req, res) => {
        try {

            //PETICION PREVIA A DEVOLVER EL ARRAY PARA NO HARCODEAR EL LIMITE A PEDIR
            let options = {
                uri: `https://pokeapi.co/api/v2/pokemon?limit=1`,
                method: "GET",
                json: true
            }
            let resultCount = await rp(options)
            resultCount = resultCount.count;

            //UTILIZA EL NUMERO TOTAL DE POKEMONES OBTENIDO PARA FORMAR LA RESPUESTA CON TODOS ELLOS
            options = {
                uri: `https://pokeapi.co/api/v2/pokemon?limit=${resultCount}`,
                method: "GET",
                json: true
            }

            let pokeNames = await rp(options)
            res.json(pokeNames.results)

        } catch (e) {
            console.log(e);
            res.json({ err: e });
        }
    });

// RUTA PARA CUANDO SE SOLICITAN POKEMONS DE X PAGINA. RECIBE COMO PARAMETRO LA CANTIDAD DE POKEMONES A DEVOLVER
router.route('/page/:num')
    .get(async(req, res) => {
        try {

            let cantPokes = req.query.pokesPerPage;
            let page = parseInt(req.params.num) - 1;

            const options = {
                uri: `https://pokeapi.co/api/v2/pokemon?offset=${cantPokes * page}&limit=${cantPokes}`,
                method: "GET",
                json: true
            }
            let resultTotal = await rp(options)

            // A PARTIR DEL NOMBRE DE CADA ELEMENTO DEL ARRAY OBTENIDO DEVUELVO UNO NUEVO CON SU ID, NOMBRE Y AVATAR
            let data = resultTotal.results.map(async poke => {
                const opt = {
                    uri: `https://pokeapi.co/api/v2/pokemon/${poke.name}`,
                    method: "GET",
                    json: true
                }
                let resp = await rp(opt)
                return ({ id: `${resp.id}`, name: `${resp.name}`, src: `${resp.sprites.front_default}` })
            });

            // ESPERO QUE SE HAYA RESUELTO COMPLETAMENTE EL ARRAY CON ID, NOMBRE Y AVATAR PARA EFECTUAR LA RESPUESTA EN JSON
            Promise.all(data)
                .then((respuesta) => {
                    res.json(respuesta);
                })

        } catch (e) {
            console.log(e);
            res.json({ err: e });
        }
    });

//RUTA PARA TRAER INFORMACION DE UN POKEMON ESPECIFICO 
router.route('/:name')
    .get(async(req, res) => {
        try {

            let name = req.params.name;

            const options = {
                uri: `https://pokeapi.co/api/v2/pokemon/${name}`,
                method: "GET",
                json: true
            }

            let infoPokemon = await rp(options);
            res.json(infoPokemon);

        } catch (e) {
            console.log(e);
            res.json({ err: e });
        }
    })
module.exports = router;