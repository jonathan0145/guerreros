const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models'); // Importa el objeto 'db' de src/models/index.js

const Player = db.Player; // Accede al modelo ApiUser a través del objeto db


// Registro público solo como user
async function register(req, res) {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const player = await Player.create({ username, password_hash: hash, role: 'user' });
  res.status(201).json({ message: 'Usuario creado', player_id: player.player_id });
}

// // Login para ambos roles
// async function login(req, res) {
//   const { username, password } = req.body;
//   const player = await Player.findOne({ where: { username } });
//   if (!player) return res.status(401).json({ message: 'Credenciales inválidas' });

//   const valid = await bcrypt.compare(password, player.password_hash);
//   if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

//   const token = jwt.sign({ player_id: player.player_id, role: player.role }, 'secreto', { expiresIn: '1h' });
//   res.json({ token, role: player.role });
// }

// Login para ambos roles
async function login(req, res) {
  const { username, password } = req.body;
  const player = await Player.findOne({ where: { username } });
  if (!player) return res.status(401).json({ message: 'Credenciales inválidas' });

  const valid = await bcrypt.compare(password, player.password_hash);
  if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign({ player_id: player.player_id, role: player.role }, 'secreto', { expiresIn: '1h' });
  res.json({ token, role: player.role, player_id: player.player_id }); // <-- Añade player_id aquí
}

// CRUD solo para admin

// Crear usuario (admin puede asignar rol)
async function adminCreate(req, res) {
  const { username, password, role } = req.body;
  if (!['admin', 'user'].includes(role)) return res.status(400).json({ message: 'Rol inválido' });
  const hash = await bcrypt.hash(password, 10);
  const player = await Player.create({ username, password_hash: hash, role });
  res.status(201).json({ message: 'Usuario creado por admin', player_id: player.player_id });
}

// Obtener todos los usuarios
async function getAll(req, res) {
  const players = await Player.findAll({ attributes: { exclude: ['password_hash'] } });
  res.json(players);
}

// Obtener usuario por id
async function getById(req, res) {
  const { id } = req.params;
  const player = await Player.findByPk(id, { attributes: { exclude: ['password_hash'] } });
  if (!player) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(player);
}

// Actualizar usuario
async function update(req, res) {
  const { id } = req.params;
  const { username, password, role } = req.body;
  if (role && !['admin', 'user'].includes(role)) return res.status(400).json({ message: 'Rol inválido' });

  const player = await Player.findByPk(id);
  if (!player) return res.status(404).json({ message: 'Usuario no encontrado' });

  if (username) player.username = username;
  if (password) player.password_hash = await bcrypt.hash(password, 10);
  if (role) player.role = role;

  await player.save();
  res.json({ message: 'Usuario actualizado' });
}

// Eliminar usuario
async function remove(req, res) {
  const { id } = req.params;
  const player = await Player.findByPk(id);
  if (!player) return res.status(404).json({ message: 'Usuario no encontrado' });
  await player.destroy();
  res.json({ message: 'Usuario eliminado' });
}

module.exports = {
  register,
  login,
  adminCreate,
  getAll,
  getById,
  update,
  remove
};