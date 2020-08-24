import { Router } from 'express';
import * as addressController from '../controllers/addressController';

const router = Router();

router
  .get('/regions', addressController.getRegionsByName);

export default router;
