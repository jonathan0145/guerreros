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
router.post('/players', register);
router.post('/login', login);

// Routes for admin only
router.post('/admin/players', verifyRole('admin'), adminCreate);
router.get('/admin/players', verifyRole('admin'), getAll);
router.get('/admin/players/:id', verifyRole('admin'), getById);
router.put('/admin/players/:id', verifyRole('admin'), update);
router.delete('/admin/players/:id', verifyRole('admin'), remove);

module.exports = router;