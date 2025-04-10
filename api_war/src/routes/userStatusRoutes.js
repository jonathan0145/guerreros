import express from 'express';
import {
    getAllUserStatuses,
    getUserStatusById,
    createUserStatus,
    updateUserStatus,
    deleteUserStatus,
} from '../controllers/userStatusController.js';

const router = express.Router();
const apiName = '/user-status';

router.route(apiName)
  .get(getAllUserStatuses) // Get all api users
  .post(createUserStatus); // Add api user

router.route(`${apiName}/:id`)
  .get(getUserStatusById) // Get api user by Id
  .put(updateUserStatus) // Update api user by Id
  .delete(deleteUserStatus); // Delete api user by Id

export default router;