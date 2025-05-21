const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Player = require('../models/player');

// Middleware para verificar token y rol admin
function verifyAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No autorizado' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secreto');
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Solo admin' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}

// Solo permite registrar usuarios con rol "user"
async function register(req, res) {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  // Siempre asigna el rol "user" al registrarse
  const player = await Player.create({ username, password_hash: hash, role: 'user' });
  res.status(201).json({ message: 'Usuario creado', player_id: player.player_id });
}

// Permite login tanto a admin como a user
async function login(req, res) {
  const { username, password } = req.body;
  const player = await Player.findOne({ where: { username } });
  if (!player) return res.status(401).json({ message: 'Credenciales inválidas' });

  const valid = await bcrypt.compare(password, player.password_hash);
  if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign({ player_id: player.player_id, role: player.role }, 'secreto', { expiresIn: '1h' });
  res.json({ token, role: player.role });
}

// Registro público solo como user
async function register(req, res) {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const player = await Player.create({ username, password_hash: hash, role: 'user' });
  res.status(201).json({ message: 'Usuario creado', player_id: player.player_id });
}

// Login para ambos roles
async function login(req, res) {
  const { username, password } = req.body;
  const player = await Player.findOne({ where: { username } });
  if (!player) return res.status(401).json({ message: 'Credenciales inválidas' });

  const valid = await bcrypt.compare(password, player.password_hash);
  if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign({ player_id: player.player_id, role: player.role }, 'secreto', { expiresIn: '1h' });
  res.json({ token, role: player.role });
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

// Obtener usuario por id (solo admin)
async function getById(req, res) {
  const { id } = req.params;
  const player = await Player.findByPk(id, { attributes: { exclude: ['password_hash'] } });
  if (!player) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(player);
}

// Actualizar usuario (admin puede cambiar rol)
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
  verifyAdmin,
  adminCreate,
  getAll,
  getById,
  update,
  remove
};