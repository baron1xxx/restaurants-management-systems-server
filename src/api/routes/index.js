import authRoutes from './authRoutes';

// register all routes
export default app => {
  app.use('/api/auth', authRoutes);
};
