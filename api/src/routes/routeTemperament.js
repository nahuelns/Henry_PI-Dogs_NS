require('dotenv').config()
const { YOUR_API_KEY } = process.env
const { Router } = require('express')
const router = Router()
const { Temperament} = require('../db')
const axios = require('axios')


router.get('/', async (req, res, next) => {
    let allDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    let dogsTemperament = allDogs.data.map((e) => (e.temperament))
    let element = '';
    for (i = 0; i < dogsTemperament.length; i++) {
        element = element + dogsTemperament[i] + ', ';
    }

    let finalTempetament = element.split(', ')

    const resultTemperament = [...new Set(finalTempetament)];

    resultTemperament.map((e) => {Temperament.findOrCreate({
        where: {name: e}
    })})

    let finalResultTemperament = await Temperament.findAll({attributes:['name']})

    res.send(finalResultTemperament);

})

module.exports = router;
