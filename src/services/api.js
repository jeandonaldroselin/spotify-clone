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
    configRequest.headers.Authorization = `Bearer ${await AsyncStorage.getItem('accessToken')}`;
    return configRequest;
  }, (e) => {
    console.error(e)
  });

export default api;
