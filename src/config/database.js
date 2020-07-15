console.log('process.env.DATABSE_URL :>> ', process.env.DATABASE_URL) 
module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'geems',
    port: 5432,
    define: {
        timestamps: true,
        underscored: true,
    },
}