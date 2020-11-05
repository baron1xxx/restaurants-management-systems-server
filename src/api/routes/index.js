import authRoutes from './authRoutes';
import addressRoutes from './addressRoutes';
import restaurantsRoutes from './restaurantsRoutes';
import menusRoutes from './menusRoutes';
import dishesRoutes from './dishesRoutes';
import tablesRoutes from './tablesRoutes';

// register all routes
export default app => {
  app.use('/api/auth', authRoutes);
  app.use('/api/address', addressRoutes);
  app.use('/api/restaurants', restaurantsRoutes);
  app.use('/api/menus', menusRoutes);
  app.use('/api/dishes', dishesRoutes);
  app.use('/api/tables', tablesRoutes);
};
