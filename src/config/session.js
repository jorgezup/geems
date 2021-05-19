const pg = require('pg')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
 
const pgPool = new pg.Pool({
  user: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  database: process.env.DATABASE_NAME || 'geems',
  ssl: {
    rejectUnauthorized: false
  }
});

let hour = 3600000
module.exports = session({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'session'   // Use another table-name than the default "session" one
  }),
  secret: '!@#$%^secret)(*&',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + hour),
    maxAge: hour
    // maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  } 
});
