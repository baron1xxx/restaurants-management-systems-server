import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import env from './env';
import sequelize from './data/db/connection';

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(env.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${env.app.port}!`);
});

socketServer.listen(env.app.socketPort);
