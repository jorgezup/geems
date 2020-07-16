// const session = require('express-session')
// const pgSession = require('connect-pg-simple')(session)

// const database = require('./database')

// console.log(database)


//   module.exports = session({
//       store: new pgSession({
//           pool:database,
//           tableName: 'session'
//       }),
//       secret: 'oqiwpeiisjksh',
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//           maxAge: 30 * 24 * 60 * 60 * 1000
//       }
//   })




const pg = require('pg')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
 
const pgPool = new pg.Pool({
  user: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  database: process.env.DATABASE_NAME || 'geems'
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


// const { Pool, Client } = require('pg');
// const connectionString = process.env.DATABASE_URL
// const pool = new Pool({
//   connectionString: connectionString,
// });


// module.exports = session({
//   store: new pgSession({
//     conString: process.env.DEV_DATABASE_URL
//   }),
//   secret: 'oqiwpeiisjksh',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
// });

