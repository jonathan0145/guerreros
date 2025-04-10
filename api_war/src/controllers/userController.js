import User from '../models/user.js';
import UserStatus from '../models/user_status.js';
import Warrior from '../models/warrior.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

// Obtener todos los usuarios con su estado
export async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      include: [{ model: UserStatus, as:'status', attributes: ['user_status_name'] }],
      attributes: { exclude: ['user_password'] }
    });
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ 
      error: {
        message: 'Error al obtener usuarios',
        status: 500
      }
    });
  }
}

// Obtener un usuario por ID con su estado y guerreros
// En getUserById y getUserProfile
export async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { 
          model: UserStatus, 
          as: 'status', 
          attributes: ['user_status_name'] 
        },
        { 
          model: WarriorUser,
          as: 'WarriorAssignments',
          include: [{
            model: Warrior,
            as: 'Warrior'
          }]
        }
      ],
      attributes: { exclude: ['user_password'] }
    });
    
    if (!user) {
      return res.status(404).json({ 
        error: {
          message: 'Usuario no encontrado',
          status: 404
        }
      });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ 
      error: {
        message: 'Error al obtener usuario',
        status: 500
      }
    });
  }
}

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: {
          message: 'User already exists with this email',
          status: 400
        }
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Generate token
    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: {
        message: 'Error registering user',
        status: 500
      }
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Invalid credentials',
          status: 401
        }
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        error: {
          message: 'Invalid credentials',
          status: 401
        }
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: {
        message: 'Error during login',
        status: 500
      }
    });
  }
};

// Obtener perfil del usuario
export async function getUserProfile(req, res) {
  try {
    const user = await User.findByPk(req.user.user_id, {
      include: [
        { model: UserStatus, as: 'status', attributes: ['user_status_name'] },
        { 
          model: Warrior,
          as: 'WarriorAssignments',
          include: [{
            model: Warrior,
            as: 'Warrior'
          }]
        }
      ],
      attributes: { exclude: ['user_password'] }
    });
    
    if (!user) {
      return res.status(404).json({
        error: {
          message: 'Usuario no encontrado',
          status: 404
        }
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      error: {
        message: 'Error al obtener perfil',
        status: 500
      }
    });
  }
}

// Actualizar perfil de usuario
export async function updateUserProfile(req, res) {
  try {
    const { User_user, User_email } = req.body;
    const user = await User.findByPk(req.user.User_id);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'Usuario no encontrado',
          status: 404
        }
      });
    }

    // Verificar si el nuevo nombre de usuario o email ya están en uso
    const existingUser = await User.findOne({
      where: {
        [Op.and]: [
          { [Op.or]: [{ User_user }, { User_email }] },
          { User_id: { [Op.ne]: req.user.User_id } }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        error: {
          message: existingUser.User_user === User_user 
            ? 'El nombre de usuario ya está en uso'
            : 'El email ya está registrado',
          status: 400
        }
      });
    }

    // Actualizar usuario
    await user.update({
      User_user,
      User_email
    });

    res.json({
      message: 'Perfil actualizado correctamente',
      user: {
        User_id: user.User_id,
        User_user: user.User_user,
        User_email: user.User_email,
        User_status_fk: user.User_status_fk
      }
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error al actualizar perfil',
        status: 500
      }
    });
  }
}

// Eliminar usuario
export async function deleteUser(req, res) {
  try {
    // Solo los administradores pueden eliminar usuarios
    if (req.user.user_role !== 'admin') {
      return res.status(403).json({
        error: {
          message: 'No tienes permisos para realizar esta acción',
          status: 403
        }
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'Usuario no encontrado',
          status: 404
        }
      });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({
      error: {
        message: 'Error al eliminar usuario',
        status: 500
      }
    });
  }
}

// Crear nuevo usuario de juego
export async function createUser(req, res) {
  try {
    const { User_user, User_email, User_password, User_role, User_status_fk } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { user_user: User_user },
          { user_email: User_email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        error: {
          message: 'Error de registro',
          detalles: [{
            campo: existingUser.user_user === User_user ? 'User_user' : 'User_email',
            mensaje: existingUser.user_user === User_user 
              ? 'El nombre de usuario ya está en uso'
              : 'El email ya está registrado'
          }]
        }
      });
    }

    // Verificar que el estado de usuario exista
    const userStatus = await UserStatus.findByPk(User_status_fk);
    if (!userStatus) {
      return res.status(500).json({
        error: {
          message: 'Error del servidor',
          detalles: 'El estado de usuario especificado no existe en la base de datos'
        }
      });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(User_password, 10);

    // Crear nuevo usuario
    const user = await User.create({
      user_user: User_user,
      user_password: hashedPassword,
      user_email: User_email,
      user_status_fk: User_status_fk,
      user_role: User_role || 'player'
    });

    // Devolver respuesta
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        user_id: user.user_id,
        user_user: user.user_user,
        user_email: user.user_email,
        user_status_fk: user.user_status_fk,
        user_role: user.user_role
      }
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ 
      error: {
        message: 'Error al crear usuario',
        detalles: error.message
      }
    });
  }
}