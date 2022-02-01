import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.SERVER_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;
