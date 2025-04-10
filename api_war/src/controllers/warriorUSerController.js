import WarriorUser from '../models/warrior_user.js';

// Crear una relación warrior-user
export const createWarriorUser = async (req, res) => {
  try {
    const warriorUser = await WarriorUser.create(req.body);
    res.status(201).json(warriorUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las relaciones warrior-user
export const getAllWarriorUsers = async (req, res) => {
  try {
    const warriorUsers = await WarriorUser.findAll();
    res.json(warriorUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una relación warrior-user por ID
export const getWarriorUserById = async (req, res) => {
  try {
    const warriorUser = await WarriorUser.findByPk(req.params.id);
    if (warriorUser) {
      res.json(warriorUser);
    } else {
      res.status(404).json({ message: 'Relación warrior-user no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una relación warrior-user
export const updateWarriorUser = async (req, res) => {
  try {
    const [updated] = await WarriorUser.update(req.body, {
      where: { warrior_user_id: req.params.id },
    });
    if (updated) {
      const updatedWarriorUser = await WarriorUser.findByPk(req.params.id);
      res.json(updatedWarriorUser);
    } else {
      res.status(404).json({ message: 'Relación warrior-user no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una relación warrior-user
export const deleteWarriorUser = async (req, res) => {
  try {
    const deleted = await WarriorUser.destroy({
      where: { warrior_user_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Relación warrior-user no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};