module.exports = {
  development: {
    username: "root",
    password: null,
    database: "war_game_dev",
    host: "127.0.0.1",
    dialect: "mysql",
    migrationStoragePath: 'sequelize',
    seederStoragePath: 'sequelize',
    migrationPath: 'src/database/migrations',
    seederPath: 'src/database/seeders'
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME_TEST || 'war_game_test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
};