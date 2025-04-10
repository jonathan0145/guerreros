import WarriorSpells from '../models/warrior_spells.js';

export async function getAllWarriorSpells(req, res) {
  try {
    const warriorSpells = await WarriorSpells.findAll();
    res.json(warriorSpells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createWarriorSpells(req, res) {
  try {
    const newWarriorSpells = await WarriorSpells.create(req.body);
    res.status(201).json(newWarriorSpells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteWarriorSpells(req, res) {
  try {
    const deletedWarriorSpells = await WarriorSpells.destroy({
      where: req.body,
    });
    if (deletedWarriorSpells) {
      res.json({ message: 'Registro eliminado' });
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}