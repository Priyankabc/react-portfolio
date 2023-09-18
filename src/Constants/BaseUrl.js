import axios from "axios";

export const postsUrl = axios.create({
    baseURL: 'https://dummyapi.io/data/v1/'
  });

   postsUrl.interceptors.request.use(
    (config) => {
      config.headers['app-id'] = '64db5eb457c5e1ed707f196e';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );