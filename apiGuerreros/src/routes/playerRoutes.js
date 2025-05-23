const express = require('express');
const controller = require('../controllers/playerController');
const router = express.Router();
const { verifyRole } = require('../middleware/verifyRole.js');

// Registro público (solo user)
router.post('/players', controller.register);

// Login para ambos roles
router.post('/login', controller.login);

// CRUD solo para admin
router.post('/admin/players', verifyRole('admin'), controller.adminCreate);
router.get('/admin/players', verifyRole('admin'), controller.getAll);
router.get('/admin/players/:id', verifyRole('admin'), controller.getById);
router.put('/admin/players/:id', verifyRole('admin'), controller.update);
router.delete('/admin/players/:id', verifyRole('admin'), controller.remove);

module.exports = router;