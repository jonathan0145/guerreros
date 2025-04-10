import express from 'express';
import {
  getAllWarriorPowers,
  createWarriorPowers,
  deleteWarriorPowers,
} from '../controllers/warriorPowersController.js';

const router = express.Router();
const apiName = '/warrior-powers';

router.route(apiName)
  .get(getAllWarriorPowers) // Get all api users
  .post(createWarriorPowers); // Add api user

router.route(`${apiName}/:id`)
  .delete(deleteWarriorPowers); // Delete api user by Id

export default router;