import { useNavigate } from 'react-router-dom';
import { getTgID } from '@/funcs/tg.funcs';
import { toError } from './routes.config';
import { BASE_URL, TG_HEADER } from './env.config';

import axios from 'axios';


export let navigate: ReturnType<typeof useNavigate> | null = null;
export let isNetworkListenerActive: boolean = false;
export let tgId: string | null = null;

export const setNavigate = (nav: ReturnType<typeof useNavigate>): void => {
  navigate = nav;
};

export const setTgId = (value: string): void => {
  tgId = value;
};

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    const telegramId = tgId || getTgID() || 'None';

    config.headers.set(TG_HEADER, telegramId);
    
    return config
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      isNetworkListenerActive = true;

      const handleOnline = (): void => {
        isNetworkListenerActive = false;
        
        window.removeEventListener("online", handleOnline);
        window.location.reload();
      }

      window.addEventListener("online", handleOnline);
    } else {
      const status = error?.response?.status;
      if ((status >= 500 && status < 600  || status === 404) && navigate) navigate(toError);
    }

    return Promise.reject(error)
  }
);

export default api;
