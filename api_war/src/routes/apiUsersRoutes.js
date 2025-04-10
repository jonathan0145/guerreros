import express from 'express';
import {
  getAllApiUsers,
  getApiUserById,
  createApiUser,
  updateApiUser,
  deleteApiUser,
} from '../controllers/apiUserController.js';

const router = express.Router();
const apiName = '/api-users';

router.route(apiName)
  .get(getAllApiUsers) // Get all api users
  .post(createApiUser); // Add api user

router.route(`${apiName}/:id`)
  .get(getApiUserById) // Get api user by Id
  .put(updateApiUser) // Update api user by Id
  .delete(deleteApiUser); // Delete api user by Id

export default router;