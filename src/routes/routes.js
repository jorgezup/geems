const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('index.pug')
})

routes.get('/cadastrar-reagente', (req, res) => {
    res.render('Reagentes/create.pug')
})
routes.get('/editar-reagente', (req, res) => {
    res.render('Reagentes/edit.pug')
})
routes.get('/buscar-reagente', (req, res) => {
    res.render('Reagentes/list.pug')
})

routes.get('/registrar-consumo', (req, res) => {
    res.render('Consumo/create.pug')
})

module.exports = routes