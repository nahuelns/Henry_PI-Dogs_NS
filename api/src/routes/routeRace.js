require('dotenv').config()
const { YOUR_API_KEY } = process.env
const { Router } = require('express')
const router = Router()
const { Race, Temperament } = require('../db')
const functionApi = require('../functions/functionApi.js')
const functionDb = require('../functions/functionDb.js')


router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        let dogsApi = await functionApi(name)
        let dogsDb = await functionDb(name)

        if (name) {
            if (dogsDb.length) {
                res.json(dogsDb)
            }

            else if (dogsApi) {
                res.json(dogsApi)
            }

            else {
                res.send("Name not found")

            }
        }

        else {
            await Promise.all([dogsDb, dogsApi])
                .then(res => [dogsDb, dogsApi] = res)
            res.send([...dogsDb, ...dogsApi]);
        }

    } catch (error) {
        next(error)
    }


})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        if (id) {
            if (id.includes('-')) {
                const idDb = await Race.findByPk(id, {
                    include: {
                      model: Temperament,
                      attributes: ['name'],
                      through: {
                        attributes: []
                      }
                    }
                  })
                res.send(idDb);
            }

            else {
                const idApi = await functionApi()
                const idApiFilter = idApi.filter( (e) => e.id == id)
                res.json(idApiFilter[0]);    
            }
        } 

        else {
            res.send('Id not found')
        }

    } catch (error) {
        next(error)
    }
})

router.post('/', async(req,res,next) => {
    const { name, temperaments, heightMin, heightMax, weightMin, weightMax, life_span } = req.body
    try {
        const newDog = await Race.create({
            name:name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()), //Cambia la primer letra a mayuscula.
            temperaments,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            life_span,
        })
        const newTemprament = await Temperament.findAll({
            where: {name: temperaments}
        })
        newDog.addTemperament(newTemprament)

        res.send('Dog has already created')

    } catch (error) {
        next(error)
    }
})


module.exports = router;

