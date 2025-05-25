const express = require('express');
const { register,
        login,
        adminCreate, 
        getAll, 
        getById, 
        update, 
        remove } = require('../controllers/playerController');
const router = express.Router();
const { verifyRole } = require('../middleware/verifyRole.js');

// Public routes
router.post('/players', controller.register);
router.post('/login', controller.login);

// Routes for admin only
router.post('/admin/players', verifyRole('admin'), controller.adminCreate);
router.get('/admin/players', verifyRole('admin'), controller.getAll);
router.get('/admin/players/:id', verifyRole('admin'), controller.getById);
router.put('/admin/players/:id', verifyRole('admin'), controller.update);
router.delete('/admin/players/:id', verifyRole('admin'), controller.remove);

module.exports = router;