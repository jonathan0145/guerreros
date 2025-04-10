import express from 'express';
import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} from '../controllers/profileController.js';

const router = express.Router();
const apiName = '/profile';

router.route(apiName)
  .get(getAllProfiles) // Get all api users
  .post(createProfile); // Add api user

router.route(`${apiName}/:id`)
  .get(getProfileById) // Get api user by Id
  .put(updateProfile) // Update api user by Id
  .delete(deleteProfile); // Delete api user by Id

export default router;