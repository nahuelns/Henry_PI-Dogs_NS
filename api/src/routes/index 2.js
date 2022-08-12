const { Router } = require('express');
const allDogs= require('./routeRace');
const allTemperament=require('./routeTemperament');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs',allDogs)
router.use('/temperament',allTemperament)

module.exports = router;