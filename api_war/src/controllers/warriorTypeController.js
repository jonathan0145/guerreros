import WarriorType from '../models/WarriorType.js';

export const getAllWarriorTypes = async (req, res) => {
  try {
    const types = await WarriorType.findAll();
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWarriorTypeById = async (req, res) => {
  try {
    const type = await WarriorType.findByPk(req.params.id);
    if (type) {
      res.json(type);
    } else {
      res.status(404).json({ message: 'Warrior type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createWarriorType = async (req, res) => {
  try {
    const type = await WarriorType.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateWarriorType = async (req, res) => {
  try {
    const type = await WarriorType.findByPk(req.params.id);
    if (type) {
      await type.update(req.body);
      res.json(type);
    } else {
      res.status(404).json({ message: 'Warrior type not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteWarriorType = async (req, res) => {
  try {
    const type = await WarriorType.findByPk(req.params.id);
    if (type) {
      await type.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Warrior type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};