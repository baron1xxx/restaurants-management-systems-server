import authRoutes from './authRoutes';
import addressRoutes from './addressRoutes';

// register all routes
export default app => {
  app.use('/api/auth', authRoutes);
  app.use('/api/address', addressRoutes);
};
