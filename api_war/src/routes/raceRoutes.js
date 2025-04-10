import express from 'express';
import {
  getAllRaces,
  getRaceById,
  createRace,
  updateRace,
  deleteRace,
} from '../controllers/raceController.js';

const router = express.Router();

router.route('/')
  .get(getAllRaces) // Get all races
  .post(createRace); // Add new race

router.route('/:id')
  .get(getRaceById) // Get race by Id
  .put(updateRace) // Update race by Id
  .delete(deleteRace); // Delete race by Id

export default router;