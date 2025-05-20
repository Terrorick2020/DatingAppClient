import { BASE_URL } from './env.config';

import axios from 'axios';


const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    if(
        config.data &&
        typeof config.data === 'object' &&
        !(config.data instanceof Blob)
    ) {
        config.headers['Content-Type'] = 'application/json';
    }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
