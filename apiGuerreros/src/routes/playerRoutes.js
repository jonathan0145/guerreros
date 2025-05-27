const express = require('express');
const {
    register,
    login,
    adminCreate, 
    getAll, 
    getById, 
    update, 
    remove 
} = require('../controllers/playerController');
const router = express.Router();
const { verifyRole } = require('../middleware/verifyRole.js');
const { verifyPlayerRole } = require('../middleware/verifyPlayerRole.js');

// Public routes
router.post('/registerplayer', register);
router.post('/loginplayer', login);

// Routes private
router.post('/admin/players', verifyRole('admin', 'service'), verifyPlayerRole('admin'), adminCreate);
router.get('/admin/players', verifyRole('admin', 'service'), verifyPlayerRole('admin'), getAll);
router.get('/admin/players/:id', verifyRole('admin', 'service'), verifyPlayerRole('admin', 'user'), getById);
router.put('/admin/players/:id', verifyRole('admin'), verifyPlayerRole('admin', 'user'), update);
router.delete('/admin/players/:id', verifyRole('admin'), verifyPlayerRole('admin'), remove);

module.exports = router;