/* Pacotes a serem utilizados */
const express = require('express')
const path = require('path')

/* Importando a database */
require('./database')

const routes = require('./routes/routes')
/* Arquivo a ser utilizado */


const methodOverride = require('method-override')
const session = require('./config/session')


/* Iniciando o app */
const app = express()

/* Session */
app.use(session)
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})




/* View */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

/* Formulário */
app.use(express.urlencoded({ extended: true }))
/* Pasta public */
app.use(express.static('public'))
app.use(methodOverride('_method')) /* sobrescrever o método, para utilizar o PUT (precisa instalar npm install method-override) */

/* Caminho das rotas */
app.use(routes)

/* Iniciar o servidor na porta  */
app.listen(3000, () => {
    console.log('server is running...')
})
