import axios from 'axios';
import config from './config.json';

const api = axios.create({
  baseURL: config.url,
});

export default api;
