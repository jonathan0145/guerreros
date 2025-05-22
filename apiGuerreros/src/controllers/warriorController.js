const Warrior = require('../models/Warrior');
const Power = require('../models/Power');
const Spell = require('../models/Spell');
const MatchWarrior = require('../models/MatchWarrior'); // Importar el modelo MatchWarrior

// Obtener todos los guerreros
async function getAllWarriors(req, res) {
  try {
    const warriors = await Warrior.findAll();
    res.json(warriors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener guerrero por ID
async function getWarriorById(req, res) {
  try {
    const warrior = await Warrior.findByPk(req.params.id);
    if (warrior) {
      res.json(warrior);
    } else {
      res.status(404).json({ message: 'Guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo guerrero
async function createWarrior(req, res) {
  try {
    const newWarrior = await Warrior.create(req.body);
    res.status(201).json(newWarrior);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un guerrero
async function updateWarrior(req, res) {
  try {
    const warrior = await Warrior.findByPk(req.params.id);
    if (warrior) {
      await warrior.update(req.body);
      res.json(warrior);
    } else {
      res.status(404).json({ message: 'Guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un guerrero
async function deleteWarrior(req, res) {
  try {
    const warrior = await Warrior.findByPk(req.params.id);
    if (warrior) {
      await warrior.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Guerrero no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Asociar un poder a un guerrero
async function addPowerToWarrior(req, res) {
  try {
    const { warriorId, powerId } = req.body;
    const warrior = await Warrior.findByPk(warriorId);
    const power = await Power.findByPk(powerId);

    if (warrior && power) {
      await warrior.addPower(power);
      res.status(200).json({ message: 'Poder agregado al guerrero' });
    } else {
      res.status(404).json({ message: 'Guerrero o poder no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un poder de un guerrero
async function removePowerFromWarrior(req, res) {
  try {
    const { warriorId, powerId } = req.body;
    const warrior = await Warrior.findByPk(warriorId);
    const power = await Power.findByPk(powerId);

    if (warrior && power) {
      await warrior.removePower(power);
      res.status(200).json({ message: 'Poder eliminado del guerrero' });
    } else {
      res.status(404).json({ message: 'Guerrero o poder no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Asociar un hechizo a un guerrero
async function addSpellToWarrior(req, res) {
  try {
    const { warriorId, spellId } = req.body;
    const warrior = await Warrior.findByPk(warriorId);
    const spell = await Spell.findByPk(spellId);

    if (warrior && spell) {
      await warrior.addSpell(spell);
      res.status(200).json({ message: 'Hechizo agregado al guerrero' });
    } else {
      res.status(404).json({ message: 'Guerrero o hechizo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un hechizo de un guerrero
async function removeSpellFromWarrior(req, res) {
  try {
    const { warriorId, spellId } = req.body;
    const warrior = await Warrior.findByPk(warriorId);
    const spell = await Spell.findByPk(spellId);

    if (warrior && spell) {
      await warrior.removeSpell(spell);
      res.status(200).json({ message: 'Hechizo eliminado del guerrero' });
    } else {
      res.status(404).json({ message: 'Guerrero o hechizo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Asociar un guerrero a un partido
async function addWarriorToMatch(req, res) {
  try {
    const { matchId, warriorId } = req.body;
    const matchWarrior = await MatchWarrior.create({ match_id: matchId, warrior_id: warriorId });

    if (matchWarrior) {
      res.status(200).json({ message: 'Guerrero agregado al partido' });
    } else {
      res.status(404).json({ message: 'Error al agregar guerrero al partido' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un guerrero de un partido
async function removeWarriorFromMatch(req, res) {
  try {
    const { matchId, warriorId } = req.body;
    const matchWarrior = await MatchWarrior.destroy({ where: { match_id: matchId, warrior_id: warriorId } });

    if (matchWarrior) {
      res.status(200).json({ message: 'Guerrero eliminado del partido' });
    } else {
      res.status(404).json({ message: 'Error al eliminar guerrero del partido' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllWarriors,
  getWarriorById,
  createWarrior,
  updateWarrior,
  deleteWarrior,
  addPowerToWarrior,
  removePowerFromWarrior,
  addSpellToWarrior,
  removeSpellFromWarrior,
  addWarriorToMatch, // Añadido aquí
  removeWarriorFromMatch // Añadido aquí
};