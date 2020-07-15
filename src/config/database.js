console.log('process.env.DATABSE_URL :>> ', process.env.DATABASE_URL) 
module.exports = {
    dialect: 'postgres',
    // url:  "postgres://postgres:postgres@localhost:5432/geems",
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'geems',
    port: 5432,
    ssl: true,
    define: {
        timestamps: true,
        underscored: true,
    },
}