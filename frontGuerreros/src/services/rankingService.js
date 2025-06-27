import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ranking';

export const getAllRanking = (config) => axios.get(API_URL, config);
export const getRankingById = (id, config) => axios.get(`${API_URL}/${id}`, config);
export const createRanking = (data, config) => axios.post(API_URL, data, config);
export const updateRanking = (id, data, config) => axios.put(`${API_URL}/${id}`, data, config);
export const deleteRanking = (id, config) => axios.delete(`${API_URL}/${id}`, config);