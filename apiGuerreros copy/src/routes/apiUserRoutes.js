const express = require('express');
const {
  register,
  login,
  create,
  getAll,
  getById,
  update,
  remove
} = require('../controllers/apiUserController');
const { verifyRole } = require('../middleware/verifyRole.js');
const includeToken = require('../middleware/includeToken');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Rutas CRUD para usuarios (solo admin)
router.post('/users', verifyRole('admin'), create);
router.get('/users', verifyRole('admin'), getAll);
router.get('/users/:id', verifyRole('admin'), getById);
router.put('/users/:id', verifyRole('admin'), update);
router.delete('/users/:id', verifyRole('admin'), remove);

module.exports = router;