import Spells from '../models/spells.js';

export async function getAllSpells(req, res) {
  try {
    const spells = await Spells.findAll();
    res.json(spells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSpellById(req, res) {
  try {
    const spell = await Spells.findByPk(req.params.id);
    if (spell) {
      res.json(spell);
    } else {
      res.status(404).json({ message: 'Hechizo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createSpell(req, res) {
  try {
    const newSpell = await Spells.create(req.body);
    res.status(201).json(newSpell);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateSpell(req, res) {
  try {
    const updatedSpell = await Spells.update(req.body, {
      where: { spell_id: req.params.id },
    });
    if (updatedSpell[0]) {
      res.json({ message: 'Hechizo actualizado' });
    } else {
      res.status(404).json({ message: 'Hechizo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteSpell(req, res) {
  try {
    const deletedSpell = await Spells.destroy({
      where: { spell_id: req.params.id },
    });
    if (deletedSpell) {
      res.json({ message: 'Hechizo eliminado' });
    } else {
      res.status(404).json({ message: 'Hechizo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}