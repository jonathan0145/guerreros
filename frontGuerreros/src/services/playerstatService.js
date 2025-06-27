import axios from 'axios';

const API_URL = 'http://localhost:3000/api/player-stats';

export const getAllPlayerStats = (config) => axios.get(API_URL, config);
export const getPlayerStatById = (id, config) => axios.get(`${API_URL}/${id}`, config);
export const createPlayerStat = (data, config) => axios.post(API_URL, data, config);
export const updatePlayerStat = (id, data, config) => axios.put(`${API_URL}/${id}`, data, config);
export const deletePlayerStat = (id, config) => axios.delete(`${API_URL}/${id}`, config);