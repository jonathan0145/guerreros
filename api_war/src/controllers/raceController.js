import Race from '../models/race.js';

export async function getAllRaces(req, res) {
  try {
    const races = await Race.findAll();
    res.json(races);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRaceById(req, res) {
  try {
    const race = await Race.findByPk(req.params.id);
    if (race) {
      res.json(race);
    } else {
      res.status(404).json({ message: 'Raza no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createRace(req, res) {
  try {
    const newRace = await Race.create(req.body);
    res.status(201).json(newRace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateRace(req, res) {
  try {
    const updatedRace = await Race.update(req.body, {
      where: { race_id: req.params.id },
    });
    if (updatedRace[0]) {
      res.json({ message: 'Raza actualizada' });
    } else {
      res.status(404).json({ message: 'Raza no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteRace(req, res) {
  try {
    const deletedRace = await Race.destroy({
      where: { race_id: req.params.id },
    });
    if (deletedRace) {
      res.json({ message: 'Raza eliminada' });
    } else {
      res.status(404).json({ message: 'Raza no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}