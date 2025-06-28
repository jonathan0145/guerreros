import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getAllPowers = () => axios.get(`${API_URL}/powers`);
export const getPowerById = (id) => axios.get(`${API_URL}/power/${id}`);
export const createPower = (data, config) => axios.post(`${API_URL}/power`, data, config);
export const updatePower = (id, data, config) => axios.put(`${API_URL}/power/${id}`, data, config);
export const deletePower = (id, config) => axios.delete(`${API_URL}/power/${id}`, config);