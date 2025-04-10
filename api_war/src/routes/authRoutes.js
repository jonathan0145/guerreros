import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import { validateLogin, validateRegister } from '../middleware/validators/authValidator.js';

const router = Router();

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/verify', AuthController.verifyToken);

export default router;