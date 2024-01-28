import axios from 'axios';

import { getToken } from '../utils';

const api = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL });// создается инстанс аксиоса и здесь задается базовая ссылка на сервер (импорт мета енв чтобы быстро потом поменять ссылку и переехать с дева на прод)

api.interceptors.request.use(// тут на каждый наш запрос на сервер, прикрепи в хэдерс запроса токен авторизации, и запрос уходит вместе с токеном в заголовке (формируется конфиг взаимодействия с сервером)
  (config) => {
    const { headers } = config;
    const token = getToken();// обрашение к локал сторадж
    if (token !== null) headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
