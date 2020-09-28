import authRoutes from './authRoutes';
import addressRoutes from './addressRoutes';
import restaurantsRoutes from './restaurantsRoutes';

// register all routes
export default app => {
  app.use('/api/auth', authRoutes);
  app.use('/api/address', addressRoutes);
  app.use('/api/restaurants', restaurantsRoutes);
};
