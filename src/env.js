import dotenv from 'dotenv';

dotenv.config();

const env = {
  app: {
    port: process.env.APP_PORT,
    socketPort: process.env.SOCKET_PORT,
    secret: {
      owner: {
        accessToken: process.env.OWNER_ACCESS_SECRET_KEY,
        refreshToken: process.env.OWNER_REFRESH_SECRET_KEY,
        activateToken: process.env.OWNER_ACTIVATE_SECRET_KEY,
        changePasswordToken: process.env.OWNER_CHANGE_PASSWORD_SECRET_KEY
      }
    }
  },
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: true
  },
  gmail: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
};

export default env;
