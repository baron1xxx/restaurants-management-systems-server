import dotenv from 'dotenv';

dotenv.config();

const env = {
  app: {
    port: process.env.APP_PORT,
    socketPort: process.env.SOCKET_PORT,
    secret: {
      accessToken: process.env.ACCESS_SECRET_KEY,
      refreshToken: process.env.REFRESH_SECRET_KEY,
      activateToken: process.env.ACTIVATE_SECRET_KEY,
      changePasswordToken: process.env.CHANGE_PASSWORD_SECRET_KEY
    },
    auth: {
      google: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
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
  },
  googleMaps: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY
  }
};

export default env;
