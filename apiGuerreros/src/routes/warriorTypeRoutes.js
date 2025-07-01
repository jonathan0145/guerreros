const express = require('express');
const {
  getAllWarriorTypes,
  getWarriorTypeById,
  createWarriorType,
  updateWarriorType,
  deleteWarriorType
} = require('../controllers/warriorTypeController');
const { verifyRole } = require('../middleware/verifyRole.js');
const { verifyPlayerRole } = require('../middleware/verifyPlayerRole.js');

const router = express.Router();

// Public routes
router.get('/warrior-types', getAllWarriorTypes);
router.get('/warrior-type/:id', getWarriorTypeById);

// Routes for admin only
router.post('/warrior-type', verifyRole('admin'), createWarriorType);
router.put('/warrior-type/:id', verifyRole('admin'), updateWarriorType);
router.delete('/warrior-type/:id', verifyRole('admin'), deleteWarriorType);

module.exports = router;