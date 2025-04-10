import Profile from '../models/profile.js';
import User from '../models/user.js'; // Importa el modelo User

// Obtener todos los perfiles con la información del usuario asociado
export async function getAllProfiles(req, res) {
  try {
    const profiles = await Profile.findAll({
      include: [{ model: User, attributes: ['User_user'] }], // Incluye la información del usuario asociado
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un perfil por ID con la información del usuario asociado
export async function getProfileById(req, res) {
  try {
    const profile = await Profile.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['User_user'] }], // Incluye la información del usuario asociado
    });
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Perfil no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo perfil
export async function createProfile(req, res) {
  try {
    const newProfile = await Profile.create(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un perfil
export async function updateProfile(req, res) {
  try {
    const updatedProfile = await Profile.update(req.body, {
      where: { Profile_id: req.params.id },
    });
    if (updatedProfile[0]) {
      res.json({ message: 'Perfil actualizado' });
    } else {
      res.status(404).json({ message: 'Perfil no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un perfil
export async function deleteProfile(req, res) {
  try {
    const deletedProfile = await Profile.destroy({
      where: { Profile_id: req.params.id },
    });
    if (deletedProfile) {
      res.json({ message: 'Perfil eliminado' });
    } else {
      res.status(404).json({ message: 'Perfil no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}