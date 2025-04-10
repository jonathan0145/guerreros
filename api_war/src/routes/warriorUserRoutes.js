import express from 'express';
import {
  createWarriorUser,
  getAllWarriorUsers,
  getWarriorUserById,
  updateWarriorUser,
  deleteWarriorUser,
} from '../controllers/warriorUserController.js';

const router = express.Router();
const apiName = '/warrior-user';

router.route(apiName)
  .get(getAllWarriorUsers) // Get all api users
  .post(createWarriorUser); // Add api user

router.route(`${apiName}/:id`)
  .get(getWarriorUserById) // Get api user by Id
  .put(updateWarriorUser) // Update api user by Id
  .delete(deleteWarriorUser); // Delete api user by Id

export default router;