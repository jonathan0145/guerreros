import axios from 'axios';

const API_URL = 'http://localhost:3000/api/powers';

export const getAllPowers = () => axios.get(API_URL);
export const getPowerById = (id) => axios.get(`${API_URL}/${id}`);
export const createPower = (data) => axios.post(API_URL, data);
export const updatePower = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePower = (id) => axios.delete(`${API_URL}/${id}`);