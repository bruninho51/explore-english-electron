import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.SERVER_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

/* api.interceptors.response.use(response => response, _error => {
    return {
        data: {
            user: {
                id: 'ckr9xxn2w000101lb9xem89wh',
                name: 'Exmple User',
                email: 'example@email.com'
            },
            token: '850fab68-7ae3-4306-b277-0c552f2779bf'
        }
    }
  }) */

export default api;
