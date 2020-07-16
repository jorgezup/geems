module.exports = {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'geems',
    port: process.env.DATABASE_PORT || '5432',
    ssl: true,
    define: {
        timestamps: true,
        underscored: true,
    },
}



