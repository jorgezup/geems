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
routes.get('/reagentes/list', onlyUsers, ReagenteController.index)
routes.get('/reagentes', onlyUsers, ReagenteController.create)
routes.get('/reagentes/:id', onlyUsers, ReagenteValidators.show, ReagenteController.find)
routes.get('/reagentes/:id/edit', onlyUsers, ReagenteController.edit)

routes.post('/reagentes', onlyUsers, ReagenteValidators.post, ReagenteController.store)
routes.put('/reagentes', onlyUsers, ReagenteController.update)
routes.delete('/reagentes', onlyUsers, ReagenteController.delete)

/* Consumo */
routes.get('/reagentes/:reagente_id/consumo', onlyUsers, ConsumoController.find)
routes.post('/reagentes/:reagente_id/consumo', onlyUsers, ConsumoController.store)

/* Users - Admin */
routes.get('/users', onlyUsers, isAdmin, UserController.create)
routes.get('/users/list', onlyUsers, isAdmin, UserController.index)
routes.get('/users/:id', onlyUsers, isAdmin, UserValidators.show, UserController.show)
routes.get('/users/:id/edit', onlyUsers, isAdmin, UserValidators.edit, UserController.edit)

routes.post('/users', onlyUsers, isAdmin, UserValidators.post, UserController.store)
routes.put('/users', onlyUsers, isAdmin, UserValidators.update, UserController.update)
routes.delete('/users', onlyUsers, isAdmin, UserValidators.remove, UserController.delete)

/* Users - MyAccount */
routes.get('/conta', AccountController.index)
routes.get('/conta/alterar-senha', AccountController.changePasswordForm)

routes.put('/conta', AccountController.update)
routes.put('/conta/alterar-senha', AccountController.changePassword)


/* Users - Resets */
routes.get('/conta/esqueceu-senha', SessionController.forgotPasswordForm)
routes.post('/conta/esqueceu-senha', SessionValidators.forgotPassword, SessionController.forgotPassword)

routes.get('/conta/reset-senha', SessionController.resetPasswordForm)
routes.post('/conta/reset-senha', SessionValidators.resetPassword, SessionController.resetPassword)


/* Login e Logout */
routes.get('/login', isLoggedRedirect, SessionController.loginForm)
routes.post('/login', SessionValidators.login, SessionController.login)
routes.post('/logout', SessionController.logout)


/* Reports */
routes.get('/relatorios', isAdmin, (req, res) => {
    res.render('reports/index')
})


module.exports = routes