import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Rutas públicas
export const getAllSpells = () => axios.get(`${API_URL}/spells`);
export const getSpellById = (id) => axios.get(`${API_URL}/spell/${id}`);

// Rutas admin/service (requieren token en config)
export const createSpell = (data, config) => axios.post(`${API_URL}/spell`, data, config);
export const updateSpell = (id, data, config) => axios.put(`${API_URL}/spell/${id}`, data, config);
export const deleteSpell = (id, config) => axios.delete(`${API_URL}/spell/${id}`, config);