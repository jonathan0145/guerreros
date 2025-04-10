import express from 'express';
import {
  getAllWarriorSpells,
  createWarriorSpells,
  deleteWarriorSpells,
} from '../controllers/warriorSpellsController.js';

const router = express.Router();
const apiName = '/warrior-spells';

router.route(apiName)
  .get(getAllWarriorSpells) // Get all api users
  .post(createWarriorSpells); // Add api user

router.route(`${apiName}/:id`)
  .delete(deleteWarriorSpells); // Delete api user by Id

export default router;