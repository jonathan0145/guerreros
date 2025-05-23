const express = require('express');
const {
  getAllWarriorTypes,
  getWarriorTypeById,
  createWarriorType,
  updateWarriorType,
  deleteWarriorType
} = require('../controllers/warriorTypeController');

const router = express.Router();

// Route to get all warrior types
router.get('/warrior-types', getAllWarriorTypes);

// Route to get a warrior type by ID
router.get('/warrior-type/:id', getWarriorTypeById);

// Route to create a new warrior type
router.post('/warrior-type', createWarriorType);

// Route to update a warrior type by ID
router.put('/warrior-type/:id', updateWarriorType);

// Route to delete a warrior type by ID
router.delete('/warrior-type/:id', deleteWarriorType);

module.exports = router;