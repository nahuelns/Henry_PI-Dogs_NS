const { Router } = require('express');
const routeRace = require('./routeRace');
const routeTemperament = require('./routeTemperament')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/dogs', routeRace);
router.use('/temperament', routeTemperament);

module.exports = router;