const express = require('express')

/* Importando Controlllers */
const ReagenteController = require('../controllers/ReagenteController')
const UserController = require('../controllers/UserController')
const ConsumoController = require('../controllers/ConsumoController')
const SessionController = require('../controllers/SessionController')

const SessionValidators = require('../validators/session')
const ReagenteValidators = require('../validators/reagente')


const { onlyUsers, isLoggedRedirect, verifyIsAdmin, isAdmin } = require('../middlewares/session')

const routes = express.Router()

routes.get('/', onlyUsers, verifyIsAdmin, (req, res) => {
    res.render('index.pug', {req})
})

/* Alias */
routes.get('/reagentes/search', onlyUsers, ReagenteController.index)

/* Reagentes */
routes.get('/reagentes/list', ReagenteController.index)
routes.get('/reagentes', ReagenteController.create)
routes.get('/reagentes/:id', ReagenteController.find)
routes.get('/reagentes/:id/edit', ReagenteController.edit)

routes.post('/reagentes', ReagenteValidators.post, ReagenteController.store)
routes.put('/reagentes', ReagenteController.update)
routes.delete('/reagentes', ReagenteController.delete)

/* Consumo */
routes.get('/reagentes/:reagente_id/consumo', ConsumoController.find)
routes.post('/reagentes/:reagente_id/consumo', ConsumoController.store)

/* Users - Admin */
routes.get('/users', isAdmin, UserController.create)
routes.get('/users/list', isAdmin, UserController.index)
routes.get('/users/:id', isAdmin, UserController.show)
routes.get('/users/:id/edit', isAdmin, UserController.edit)

routes.post('/users', isAdmin, UserController.store)
routes.put('/users', isAdmin, UserController.update)
routes.delete('/usesr', isAdmin, UserController.delete)


/* Users - Resets */
routes.get('/conta/esqueceu-senha', SessionController.forgotPasswordForm)
routes.get('/conta/reset-senha', SessionController.resetPasswordForm)


/* Login e Logout */
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionValidators.login, SessionController.login)
routes.post('/logout', SessionController.logout)


/* Reports */
routes.get('/relatorios', isAdmin, (req, res) => {
    res.render('reports/index')
})


module.exports = routes