import axios from 'axios';
import config from './config.json';

const api = axios.create({
  baseURL: config.url,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

export default api;
