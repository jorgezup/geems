const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Reagente = require('../models/Reagente')
const User = require('../models/User')
const Consumo = require('../models/Consumo')
const Cargo = require('../models/Cargo')

const connection = new Sequelize(dbConfig)

Reagente.init(connection)
User.init(connection)
Consumo.init(connection)
Cargo.init(connection)

Consumo.associate(connection.models)

module.exports = connection