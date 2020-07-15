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

console.log('Session -> Datab')

if (process.env.DATABASE_URL) {
  module.exports = session({
    store: new pgSession({
      conString: process.env.DATABASE_URL,             // Connection pool
      tableName : 'session'   // Use another table-name than the default "session" one
    }),
    secret: 'oqiwpeiisjksh',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  });
}

 
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

