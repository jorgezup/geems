const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Reagente = require('../models/Reagente')

const connection = new Sequelize(dbConfig)

Reagente.init(connection)

module.exports = connection