import express from 'express';
import {
  getAllPowers,
  getPowerById,
  createPower,
  updatePower,
  deletePower,
} from '../controllers/powerController.js';

import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

const apiName = '/powers';

router.route(apiName)
  .get(authenticateToken, getAllPowers) // Get all api users
  .post(createPower); // Add api user

router.route(`${apiName}/:id`)
  .get(getPowerById) // Get api user by Id
  .put(updatePower) // Update api user by Id
  .delete(deletePower); // Delete api user by Id

export default router;