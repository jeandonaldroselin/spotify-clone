import axios from 'axios';
import config from './config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isJwtExpired } from 'jwt-check-expiration';
import NavigationService from './NavigationService';
import moment from 'moment';

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
    // 1 - Avoid passing token to authentication routes
    const isAuthenticationUrl = configRequest.url.includes('login') || configRequest.url.includes('refresh');
    if(isAuthenticationUrl) {
      console.log('log-0', configRequest.url);
      return configRequest;
    } else {
      console.log('log-1', configRequest.url);
      // 2 - Select the current tokens
        let accessToken = await AsyncStorage.getItem('accessToken');
        let refreshToken = await AsyncStorage.getItem('refreshToken');
        // 3 - Determine if tokens are expired
        let isAccessTokenExpired = true;
        let isRefreshTokenExpired = true;
        if(accessToken) {
          console.log('log-a');
          try {
            console.log('log-a1')
            isAccessTokenExpired = await isJwtExpired(accessToken);
          } catch (e) {
            console.log('log-a2')
          }
        } else {
          NavigationService.navigate('Auth');
          return configRequest;
        }
        if(isAccessTokenExpired && refreshToken) {
          console.log('log-b');
          try {
            console.log('log-b1');
            isRefreshTokenExpired = await isJwtExpired(refreshToken);
          } catch (e) {
            console.log('log-b2');
          }
        }

        // Manage the requests based on token
        if (isAccessTokenExpired) {
          console.log('log-c');
          // A - If the both tokens are expired, remove the content and redirect the user
          if(isRefreshTokenExpired) {
            console.log('log-c1', refreshToken);
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
          } else {
            console.log('log-c2');
              // B - If only the access token is expired, try to get a new couple with refresh token
              const refreshResult = await api.post('/refresh', JSON.stringify({ refresh_token: refreshToken })).catch(function() {
                AsyncStorage.removeItem('accessToken');
                AsyncStorage.removeItem('refreshToken');
                NavigationService.navigate('Auth');
                return configRequest;
              });
              const data = refreshResult != undefined && refreshResult.data != undefined ? refreshResult.data : undefined;
              if(data != undefined && data.hasOwnProperty('accessToken')) {
                  console.log('log-c2.1', data);
                  accessToken = data.accessToken;
                  refreshToken = data.refreshToken;
                  const currentTimestamp = moment().unix();
                  await AsyncStorage.setItem('accessToken', data.accessToken);
                  try {
                    await AsyncStorage.setItem('refreshToken', data.refreshToken);
                  } catch (e) {
                    console.log('refreshToken is null so we remove it', data.refreshToken);
                    await AsyncStorage.removeItem('refreshToken');
                  }
                  await AsyncStorage.setItem('refreshExpiresAt', JSON.stringify(data.refreshExpiresIn + currentTimestamp));
                  await AsyncStorage.setItem('accessExpiresAt', JSON.stringify(data.accessExpiresIn + currentTimestamp));
                  configRequest.headers.Authorization = `Bearer ${accessToken}`;
                  return configRequest;
                } else {
                 console.log('log-c2.2');
                  // C - If the refresh token is expired, remove the content and redirect the user
                  await AsyncStorage.removeItem('accessToken');
                  await AsyncStorage.removeItem('refreshToken');
              }
          }
          console.log('log-d');
          NavigationService.navigate('Auth');
          return configRequest;
        }

        // if a valid token is provided, add it to the request
        console.log('log-e')
        configRequest.headers.Authorization = `Bearer ${accessToken}`;
        return configRequest;
    }
  }, (e) => {
    console.error(e)
  });

export default api;
