import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Rutas públicas
export const getAllRaces = () => axios.get(`${API_URL}/races`);
export const getRaceById = (id) => axios.get(`${API_URL}/race/${id}`);

// Rutas solo admin (requieren token en config)
export const createRace = (data, config) => axios.post(`${API_URL}/race`, data, config);
export const updateRace = (id, data, config) => axios.put(`${API_URL}/race/${id}`, data, config);
export const deleteRace = (id, config) => axios.delete(`${API_URL}/race/${id}`, config);