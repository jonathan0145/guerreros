const WarriorType = require('../models/WarriorType');

// Obtener todos los tipos de guerreros
async function getAllWarriorTypes(req, res) {
  try {
    const warriorTypes = await WarriorType.findAll();
    res.json(warriorTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener tipo de guerrero por ID
async function getWarriorTypeById(req, res) {
  try {
    const warriorType = await WarriorType.findByPk(req.params.id);
    if (warriorType) {
      res.json(warriorType);
    } else {
      res.status(404).json({ message: 'Tipo de guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo tipo de guerrero
async function createWarriorType(req, res) {
  try {
    const newWarriorType = await WarriorType.create(req.body);
    res.status(201).json(newWarriorType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un tipo de guerrero
async function updateWarriorType(req, res) {
  try {
    const warriorType = await WarriorType.findByPk(req.params.id);
    if (warriorType) {
      await warriorType.update(req.body);
      res.json(warriorType);
    } else {
      res.status(404).json({ message: 'Tipo de guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un tipo de guerrero
async function deleteWarriorType(req, res) {
  try {
    const warriorType = await WarriorType.findByPk(req.params.id);
    if (warriorType) {
      await warriorType.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Tipo de guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllWarriorTypes,
  getWarriorTypeById,
  createWarriorType,
  updateWarriorType,
  deleteWarriorType
};