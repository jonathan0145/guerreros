import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Rutas públicas
export const getAllWarriors = () => axios.get(`${API_URL}/warriors`);
export const getWarriorById = (id) => axios.get(`${API_URL}/warrior/${id}`);
export const getWarriorDetails = (id) => axios.get(`${API_URL}/warriorpm/${id}`);

// Rutas solo admin (requieren token en config)
export const createWarrior = (data, config) => axios.post(`${API_URL}/warrior`, data, config);
export const updateWarrior = (id, data, config) => axios.put(`${API_URL}/warrior/${id}`, data, config);
export const deleteWarrior = (id, config) => axios.delete(`${API_URL}/warrior/${id}`, config);

// Rutas admin y service (requieren token en config)
export const addPowerToWarrior = (warriorId, powerId, config) =>
  axios.post(`${API_URL}/warrior/${warriorId}/power/${powerId}`, {}, config);

export const removePowerFromWarrior = (warriorId, powerId, config) =>
  axios.delete(`${API_URL}/warrior/${warriorId}/power/${powerId}`, config);

export const addSpellToWarrior = (warriorId, spellId, config) =>
  axios.post(`${API_URL}/warrior/${warriorId}/spell/${spellId}`, {}, config);

export const removeSpellFromWarrior = (warriorId, spellId, config) =>
  axios.delete(`${API_URL}/warrior/${warriorId}/spell/${spellId}`, config);

export const addWarriorToMatch = (matchId, warriorId, config) =>
  axios.post(`${API_URL}/match/${matchId}/warrior/${warriorId}`, {}, config);

export const removeWarriorFromMatch = (matchId, warriorId, config) =>
  axios.delete(`${API_URL}/match/${matchId}/warrior/${warriorId}`, config);