import WarriorPowers from '../models/warrior_powers.js';

export async function getAllWarriorPowers(req, res) {
  try {
    const warriorPowers = await WarriorPowers.findAll();
    res.json(warriorPowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createWarriorPowers(req, res) {
  try {
    const newWarriorPowers = await WarriorPowers.create(req.body);
    res.status(201).json(newWarriorPowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteWarriorPowers(req, res) {
  try {
    const deletedWarriorPowers = await WarriorPowers.destroy({
      where: req.body,
    });
    if (deletedWarriorPowers) {
      res.json({ message: 'Registro eliminado' });
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}