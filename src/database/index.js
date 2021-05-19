const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Reagente = require('../models/Reagente')
const User = require('../models/User')
const Consumo = require('../models/Consumo')
const Papel = require('../models/Papel')
const Orgao = require('../models/Orgao')
const Local = require('../models/Local')

const connection = new Sequelize(dbConfig)
if (process.env.DATABASE_URL) {
    const connection = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',

        /* Added to fix Heroku pg_hba.conf error */
        logging: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}

// console.log(connection)

// const connection = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     ssl: true,
//     define: {
//         timestamps: true,
//         underscored: true,
//     },
// });


Reagente.init(connection)
User.init(connection)
Consumo.init(connection)
Papel.init(connection)
Orgao.init(connection)
Local.init(connection)

Consumo.associate(connection.models)
User.associate(connection.models)
Reagente.associate(connection.models)

module.exports = connection

