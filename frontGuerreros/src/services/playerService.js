import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Rutas públicas
export const registerPlayer = (data) => axios.post(`${API_URL}/registerplayer`, data);
export const loginPlayer = (data) => axios.post(`${API_URL}/loginplayer`, data);

// Rutas privadas (requieren token en headers)
export const adminCreatePlayer = (data, config) => axios.post(`${API_URL}/admin/players`, data, config);
export const getAllPlayers = (config) => axios.get(`${API_URL}/admin/players`, config);
export const getPlayerById = (id, config) => axios.get(`${API_URL}/admin/players/${id}`, config);
export const updatePlayer = (id, data, config) => axios.put(`${API_URL}/admin/players/${id}`, data, config);
export const deletePlayer = (id, config) => axios.delete(`${API_URL}/admin/players/${id}`, config);