import { Router } from 'express';
import * as addressController from '../controllers/addressController';

const router = Router();

router
  .get('/regions', addressController.getRegionsByName)
  .get('/cities', addressController.getCitiesByRegionIdByName)
  .get('/streets', addressController.getStreetsByCityIdByName);

export default router;
