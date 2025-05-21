const express = require('express');
const { getWarrior, createWarrior, updateWarrior, deleteWarrior, getAllWarriors } = require('../controllers/warriorController');

const router = express.Router();

router.get('/warriors', getAllWarriors);
router.get('/warrior/:id', getWarrior);
router.post('/warrior', createWarrior);
router.put('/warrior/:id', updateWarrior);
router.delete('/warrior/:id', deleteWarrior);

module.exports = router;