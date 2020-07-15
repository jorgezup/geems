const express = require('express')

/* Importando Controlllers */
const ReagenteController = require('../controllers/ReagenteController')
const UserController = require('../controllers/UserController')
const ConsumoController = require('../controllers/ConsumoController')
const SessionController = require('../controllers/SessionController')
const AccountController = require('../controllers/AccountController')

const SessionValidators = require('../validators/session')
const ReagenteValidators = require('../validators/reagente')
const UserValidators = require('../validators/user')


const { onlyUsers, isLoggedRedirect, isAdmin } = require('../middlewares/session')

const routes = express.Router()

routes.get('/', onlyUsers, (req, res) => {
    const isAdmin = req.user.is_admin 
    res.render('index.pug', {isAdmin})
})

/* Alias */
routes.get('/reagentes/search', onlyUsers, ReagenteController.index)

/* Reagentes */
routes.get('/reagentes/list', ReagenteController.index)
routes.get('/reagentes', ReagenteController.create)
routes.get('/reagentes/:id', ReagenteValidators.show, ReagenteController.find)
routes.get('/reagentes/:id/edit', onlyUsers, ReagenteController.edit)

routes.post('/reagentes', ReagenteValidators.post, ReagenteController.store)
routes.put('/reagentes', ReagenteController.update)
routes.delete('/reagentes', ReagenteController.delete)

/* Consumo */
routes.get('/reagentes/:reagente_id/consumo', ConsumoController.find)
routes.post('/reagentes/:reagente_id/consumo', ConsumoController.store)

/* Users - Admin */
// routes.get('/users', UserController.create)
routes.get('/users', isAdmin, UserController.create)
routes.get('/users/list', isAdmin, UserController.index)
routes.get('/users/:id', isAdmin, UserValidators.show, UserController.show)
routes.get('/users/:id/edit', isAdmin, UserValidators.edit, UserController.edit)

// routes.post('/users', UserController.store)
routes.post('/users', isAdmin, UserValidators.post, UserController.store)
routes.put('/users', isAdmin, UserValidators.update, UserController.update)
routes.delete('/users', isAdmin, UserValidators.remove, UserController.delete)

/* Users - MyAccount */
routes.get('/conta', AccountController.index)
routes.put('/conta', AccountController.update)


/* Users - Resets */
routes.get('/conta/esqueceu-senha', SessionController.forgotPasswordForm)
routes.post('/conta/esqueceu-senha', SessionValidators.forgotPassword, SessionController.forgotPassword)

routes.get('/conta/reset-senha', SessionController.resetPasswordForm)
routes.post('/conta/reset-senha', SessionValidators.resetPassword, SessionController.resetPassword)


/* Login e Logout */
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionValidators.login, SessionController.login)
routes.post('/logout', SessionController.logout)


/* Reports */
routes.get('/relatorios', isAdmin, (req, res) => {
    res.render('reports/index')
})


module.exports = routes