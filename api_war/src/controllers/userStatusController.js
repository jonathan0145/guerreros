import UserStatus from '../models/user_status.js';

// Obtener todos los estados de usuario
export async function getAllUserStatuses(req, res) {
  try {
    const userStatuses = await UserStatus.findAll();
    res.json(userStatuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un estado de usuario por ID
export async function getUserStatusById(req, res) {
  try {
    const userStatus = await UserStatus.findByPk(req.params.id);
    if (userStatus) {
      res.json(userStatus);
    } else {
      res.status(404).json({ message: 'Estado de usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo estado de usuario
export async function createUserStatus(req, res) {
  try {
    const newUserStatus = await UserStatus.create(req.body);
    res.status(201).json(newUserStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un estado de usuario
export async function updateUserStatus(req, res) {
  try {
    const updatedUserStatus = await UserStatus.update(req.body, {
      where: { User_status_id: req.params.id },
    });
    if (updatedUserStatus[0]) {
      res.json({ message: 'Estado de usuario actualizado' });
    } else {
      res.status(404).json({ message: 'Estado de usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un estado de usuario
export async function deleteUserStatus(req, res) {
  try {
    const deletedUserStatus = await UserStatus.destroy({
      where: { User_status_id: req.params.id },
    });
    if (deletedUserStatus) {
      res.json({ message: 'Estado de usuario eliminado' });
    } else {
      res.status(404).json({ message: 'Estado de usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}