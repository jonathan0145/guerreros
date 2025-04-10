import Powers from '../models/powers.js';

export async function getAllPowers(req, res) {
  try {
    const powers = await Powers.findAll();
    res.json(powers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPowerById(req, res) {
  try {
    const power = await Powers.findByPk(req.params.id);
    if (power) {
      res.json(power);
    } else {
      res.status(404).json({ message: 'Poder no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createPower(req, res) {
  try {
    const newPower = await Powers.create(req.body);
    res.status(201).json(newPower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updatePower(req, res) {
  try {
    const updatedPower = await Powers.update(req.body, {
      where: { power_id: req.params.id },
    });
    if (updatedPower[0]) {
      res.json({ message: 'Poder actualizado' });
    } else {
      res.status(404).json({ message: 'Poder no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deletePower(req, res) {
  try {
    const deletedPower = await Powers.destroy({
      where: { power_id: req.params.id },
    });
    if (deletedPower) {
      res.json({ message: 'Poder eliminado' });
    } else {
      res.status(404).json({ message: 'Poder no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}