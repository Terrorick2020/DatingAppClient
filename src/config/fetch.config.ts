import { useNavigate } from 'react-router-dom';
import { getTgID } from '@/funcs/tg.funcs';
import { BASE_URL } from './env.config';

import axios from 'axios';


export let navigate: ReturnType<typeof useNavigate> | null = null;
export let tgId: string | null = null;

export const setNavigate = (nav: ReturnType<typeof useNavigate>): void => {
  navigate = nav
};

export const setTgId = (value: string): void => {
  tgId = value;
};

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  config => {
    const telegramId = tgId ? tgId : getTgID();

    if (telegramId) {
      config.headers!['x-spectre-telegram-id'] = telegramId
    }
    
    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    if ((status >= 500 && status < 600  || status === 404) && navigate) navigate('error');

    return Promise.reject(error)
  }
)

export default api;
