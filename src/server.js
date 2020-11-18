import express from 'express';
import http from 'http';
import cors from 'cors';
import './config/passportConfig';
import passport from 'passport';
import socketIO from 'socket.io';
import env from './env';
import sequelize from './data/db/connection';
import routes from './api/routes/index';
import authorizationMiddleware from './api/middlewares/authMiddlewares/authorizationMiddleware';
import routesWhiteListConfig from './config/routesWhiteListConfig';
import errorHandlerMiddleware from './api/middlewares/errorHandlerMiddleware';

const app = express();
const socketServer = http.Server(app);
// eslint-disable-next-line no-unused-vars
const io = socketIO(socketServer);

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

// eslint-disable-next-line no-unused-vars
io.on('connection', socket => {
});
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// TODO Для всіх не пвдходить (Наприклад GET, PUT, DELETE /:id). Щось інше потрібно!!!
app.use('/api/', authorizationMiddleware(routesWhiteListConfig));
routes(app);

app.use(errorHandlerMiddleware);

app.listen(env.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${env.app.port}!`);
});

socketServer.listen(env.app.socketPort);
