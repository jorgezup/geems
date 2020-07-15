// const session = require('express-session')
// const pgSession = require('connect-pg-simple')(session)
// const database = require('./database')

// module.exports = session({
//     store: new pgSession({
//         pool:database
//     }),
//     secret: 'oqiwpeiisjksh',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 30 * 24 * 60 * 60 * 1000
//     }
// })


const pg = require('pg')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
 
const pgPool = new pg.Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'geems'
});
 
module.exports = session({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'session'   // Use another table-name than the default "session" one
  }),
  secret: 'oqiwpeiisjksh',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
});