const express = require('express');
const controller = require('../controllers/playerController');
const router = express.Router();

// Registro público (solo user)
router.post('/players', controller.register);

// Login para ambos roles
router.post('/login', controller.login);

// CRUD solo para admin
router.post('/admin/players', controller.verifyAdmin, controller.adminCreate);
router.get('/admin/players', controller.verifyAdmin, controller.getAll);
router.get('/admin/players/:id', controller.verifyAdmin, controller.getById);
router.put('/admin/players/:id', controller.verifyAdmin, controller.update);
router.delete('/admin/players/:id', controller.verifyAdmin, controller.remove);

module.exports = router;