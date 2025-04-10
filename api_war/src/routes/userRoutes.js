import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  createUser
} from '../controllers/userController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Validation middleware
const userValidation = [
  body('User_user').trim().isLength({ min: 3 }).escape()
    .withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
  body('User_email').isEmail().normalizeEmail()
    .withMessage('Debe proporcionar un email válido'),
  body('User_password').isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  validateRequest
];

const userUpdateValidation = [
  body('user_user').trim().isLength({ min: 3 }).escape()
    .withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
  body('user_email').isEmail().normalizeEmail()
    .withMessage('Debe proporcionar un email válido'),
  validateRequest
];

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas públicas (requieren autenticación)
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/profile', getUserProfile);
router.post('/', userValidation, createUser);

// Rutas protegidas (requieren autenticación)
router.put('/profile', userUpdateValidation, updateUserProfile);
router.delete('/:id', deleteUser);

export default router;