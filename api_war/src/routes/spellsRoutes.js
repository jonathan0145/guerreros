import express from 'express';
import {
  getAllSpells,
  getSpellById,
  createSpell,
  updateSpell,
  deleteSpell,
} from '../controllers/spellsController.js';

const router = express.Router();
const apiName = '/spells';

router.route(apiName)
  .get(getAllSpells) // Get all api users
  .post(createSpell); // Add api user

router.route(`${apiName}/:id`)
  .get(getSpellById) // Get api user by Id
  .put(updateSpell) // Update api user by Id
  .delete(deleteSpell); // Delete api user by Id

export default router;