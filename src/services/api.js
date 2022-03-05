import axios from 'axios';
import config from './config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: config.url,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  cancelToken: new axios.CancelToken(function (cancel) {
  }),
});

api.interceptors.request.use(
  async (configRequest) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const isAuthenticationUrl = configRequest.url.includes('login') || configRequest.url.includes('api/refresh');
    if(accessToken && isAuthenticationUrl === false){
      console.log(accessToken)
      configRequest.headers.Authorization = `Bearer ${accessToken}`;
    }
    return configRequest;
  }, (e) => {
    console.error(e)
  });

export default api;
