/* Pacotes a serem utilizados */
const express = require('express')
const path = require('path')

/* Arquivo a ser utilizado */
const routes = require('./routes/routes')

/* Iniciando o app */
const app = express()

/* View */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

/* Formulário */
app.use(express.urlencoded({ extended: true }))
/* Pasta public */
app.use(express.static('public'))

/* Caminho das rotas */
app.use(routes)

/* Iniciar o servidor na porta  */
app.listen(3000, () => {
    console.log('server is running...')
})
