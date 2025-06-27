import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Rutas públicas
export const getAllWarriorTypes = () => axios.get(`${API_URL}/warrior-types`);
export const getWarriorTypeById = (id) => axios.get(`${API_URL}/warrior-type/${id}`);

// Rutas solo admin (requieren token en config)
export const createWarriorType = (data, config) => axios.post(`${API_URL}/warrior-type`, data, config);
export const updateWarriorType = (id, data, config) => axios.put(`${API_URL}/warrior-type/${id}`, data, config);
export const deleteWarriorType = (id, config) => axios.delete(`${API_URL}/warrior-type/${id}`, config);