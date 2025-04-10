import { Router } from 'express';
import {
  getAllWarriorTypes,
  getWarriorTypeById,
  createWarriorType,
  updateWarriorType,
  deleteWarriorType
} from '../controllers/warriorTypeController.js';

const router = Router();

router.get('/', getAllWarriorTypes);
router.get('/:id', getWarriorTypeById);
router.post('/', createWarriorType);
router.put('/:id', updateWarriorType);
router.delete('/:id', deleteWarriorType);

export default router;