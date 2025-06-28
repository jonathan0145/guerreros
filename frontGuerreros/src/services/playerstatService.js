// import axios from 'axios';

// const API_URL = 'http://localhost:3000/api';

// export const getAllPlayerStats = (config) => axios.get(`${API_URL}/player-stats`, config);
// export const createPlayerStat = (data, config) => axios.post(`${API_URL}/player-stat`, data, config);
// export const updatePlayerStat = (id, data, config) => axios.put(`${API_URL}/player-stat/${id}`, data, config);
// export const deletePlayerStat = (id, config) => axios.delete(`${API_URL}/player-stat/${id}`, config);

import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getAllPlayerStats = (config) => axios.get(`${API_URL}/player-stats`, config);
export const createPlayerStat = (data, config) => axios.post(`${API_URL}/player-stat`, data, config);
export const updatePlayerStat = (id, data, config) => axios.put(`${API_URL}/player-stat/${id}`, data, config);
export const deletePlayerStat = (id, config) => axios.delete(`${API_URL}/player-stat/${id}`, config);