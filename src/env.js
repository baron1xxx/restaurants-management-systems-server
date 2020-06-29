import dotenv from 'dotenv';

dotenv.config();

const env = {
  app: {
    port: process.env.APP_PORT,
    socketPort: process.env.SOCKET_PORT
  },
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: true
  }
};

export default env;
