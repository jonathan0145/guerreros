const Spell = require('../models/Spell');

// Obtener todos los hechizos
async function getAllSpells(req, res) {
  try {
    const spells = await Spell.findAll();
    res.json(spells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener hechizo por ID
async function getSpellById(req, res) {
  try {
    const spell = await Spell.findByPk(req.params.id);
    if (spell) {
      res.json(spell);
    } else {
      res.status(404).json({ message: 'Hechizo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo hechizo
async function createSpell(req, res) {
  try {
    const newSpell = await Spell.create(req.body);
    res.status(201).json(newSpell);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un hechizo
async function updateSpell(req, res) {
  try {
    const spell = await Spell.findByPk(req.params.id);
    if (spell) {
      await spell.update(req.body);
      res.json(spell);
    } else {
      res.status(404).json({ message: 'Hechizo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un hechizo
async function deleteSpell(req, res) {
  try {
    const spell = await Spell.findByPk(req.params.id);
    if (spell) {
      await spell.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Hechizo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllSpells,
  getSpellById,
  createSpell,
  updateSpell,
  deleteSpell
};