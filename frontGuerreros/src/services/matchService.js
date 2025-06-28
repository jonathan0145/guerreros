import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Rutas públicas
export const getAllMatches = () => axios.get(`${API_URL}/matches`);
export const getMatchById = (id) => axios.get(`${API_URL}/match/${id}`);

// Rutas solo admin (requieren config con token)
export const createMatch = (data, config) => axios.post(`${API_URL}/match`, data, config);
export const updateMatch = (id, data, config) => axios.put(`${API_URL}/match/${id}`, data, config);
export const deleteMatch = (id, config) => axios.delete(`${API_URL}/match/${id}`, config);

// Rutas para admin y service
export const addPlayerToMatch = (matchId, playerId, config) =>
  axios.post(`${API_URL}/match/${matchId}/player/${playerId}`, {}, config);

export const removePlayerFromMatch = (matchId, playerId, config) =>
  axios.delete(`${API_URL}/match/${matchId}/player/${playerId}`, config);

export const selectWarriorsForMatch = (data, config) =>
  axios.post(`${API_URL}/select-warriors`, data, config);

export const playMatch = (matchId, data, config) =>
  axios.post(`${API_URL}/match/${matchId}/play`, data, config);

export const finishMatch = (matchId, data, config) =>
  axios.put(`${API_URL}/match/${matchId}/finish`, data, config);