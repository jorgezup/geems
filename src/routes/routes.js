const express = require('express')

/* Importando Controlllers */
const ReagenteController = require('../controllers/ReagenteController')

const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('index.pug')
})

routes.get('/cadastrar-reagente', (req, res) => {
    res.render('Reagentes/create.pug')
})
routes.post('/cadastrar-reagente', ReagenteController.store)

routes.get('/editar-reagente/:id', ReagenteController.edit)
routes.put('/editar-reagente', ReagenteController.update)
routes.delete('/editar-reagente', ReagenteController.delete)
routes.get('/buscar-reagente', ReagenteController.index)
routes.get('/buscar-reagente/:id', ReagenteController.find)

routes.get('/registrar-consumo/:id', ReagenteController.consumo)
// routes.put('/registrar-consumo', ReagenteController.registrarConsumo)

/* Alias */
routes.get('/reagentes/search', ReagenteController.index)

module.exports = routes