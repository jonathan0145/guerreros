import { Router } from 'express';
import WarriorController from '../controllers/WarriorController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateWarriorCreation } from '../middleware/validators/warriorValidator.js';

const router = Router();

// Rutas públicas
router.get('/', WarriorController.getAllWarriors);
router.get('/:id', WarriorController.getWarriorById);

// Rutas protegidas
router.use(authenticateToken);
router.post('/', validateWarriorCreation, WarriorController.createWarrior);
router.put('/:id', validateWarriorCreation, WarriorController.updateWarrior);
router.delete('/:id', WarriorController.deleteWarrior);
router.get('/user/my-warriors', WarriorController.getMyWarriors);
router.post('/:id/assign-power', WarriorController.assignPower);
router.post('/:id/assign-spell', WarriorController.assignSpell);

export default router;