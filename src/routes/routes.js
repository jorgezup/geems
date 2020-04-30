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
// routes.delete('/editar-reagente/:id', ReagenteController.delete)
routes.get('/buscar-reagente', ReagenteController.index)
routes.get('/buscar-reagente/:id', ReagenteController.find)

routes.get('/registrar-consumo', (req, res) => {
    res.render('Consumo/create.pug')
})

/* Alias */
routes.get('/reagentes/search', ReagenteController.index)
routes.get('/reagentes/search2', ReagenteController.orderByName)
routes.get('/reagentes/search3', ReagenteController.orderByName)

module.exports = routes