const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genres = require('./genres')
const vidyas = require('./vidyagames')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', vidyas);
router.use('/', genres)

module.exports = router;
