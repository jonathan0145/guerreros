const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiUser = require('../models/ApiUser');


// Registro público (solo service y read_only)
async function register(req, res) {
  const { username, password, role } = req.body;
  if (!['service', 'read_only'].includes(role)) {
    return res.status(400).json({ message: 'Solo se permite crear usuarios con rol service o read_only' });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await ApiUser.create({ username, password_hash: hash, role });
  res.status(201).json({ message: 'Usuario API creado', api_user_id: user.api_user_id });
}

// Login para todos los roles
async function login(req, res) {
  const { username, password } = req.body;
  const user = await ApiUser.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign({ api_user_id: user.api_user_id, role: user.role }, 'secreto', { expiresIn: '1h' });
  res.json({ token, role: user.role });
}

// CRUD solo para admin
async function create(req, res) {
  const { username, password, role } = req.body;
  if (!['admin', 'service', 'read_only'].includes(role)) {
    return res.status(400).json({ message: 'Rol inválido' });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await ApiUser.create({ username, password_hash: hash, role });
  res.status(201).json({ message: 'Usuario API creado por admin', api_user_id: user.api_user_id });
}

async function getAll(req, res) {
  const users = await ApiUser.findAll({ attributes: { exclude: ['password_hash'] } });
  res.json(users);
}

async function getById(req, res) {
  const { id } = req.params;
  const user = await ApiUser.findByPk(id, { attributes: { exclude: ['password_hash'] } });
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
}

async function update(req, res) {
  const { id } = req.params;
  const { username, password, role } = req.body;
  if (role && !['admin', 'service', 'read_only'].includes(role)) {
    return res.status(400).json({ message: 'Rol inválido' });
  }
  const user = await ApiUser.findByPk(id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  if (username) user.username = username;
  if (password) user.password_hash = await bcrypt.hash(password, 10);
  if (role) user.role = role;

  await user.save();
  res.json({ message: 'Usuario actualizado' });
}

async function remove(req, res) {
  const { id } = req.params;
  const user = await ApiUser.findByPk(id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  await user.destroy();
  res.json({ message: 'Usuario eliminado' });
}

module.exports = {
  register,
  login,
  verifyAdmin,
  create,
  getAll,
  getById,
  update,
  remove
};