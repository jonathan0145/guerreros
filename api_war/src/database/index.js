import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_NAME = 'war_game_dev',
  DB_USER = 'root',
  DB_PASSWORD = 'admin',
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
  NODE_ENV = 'development'
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: 'local'
  },
  timezone: 'America/Bogota'
});

export default sequelize;