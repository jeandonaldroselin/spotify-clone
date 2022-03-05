
import React from 'react';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import { isJwtExpired } from 'jwt-check-expiration';
import { AuthenticationContext } from "../../../context/authentication.context";
import api from '../../../services/api';
import NavigationService from '../../../services/NavigationService';
import moment from 'moment';

export default class AuthLoadingScreen extends React.Component {

    static contextType = AuthenticationContext;

    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async (/*authenticationContext*/) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        let isAccessTokenExpired = true;
        let isRefreshTokenExpired = true;
        if(accessToken) {
          try {
            isAccessTokenExpired = await isJwtExpired(accessToken);
          } catch (e) {
            console.log('token is invalid', e);
          }
        } else {
            return this.props.navigation.navigate('Auth');
        }

        if(refreshToken) {
          try {
            isRefreshTokenExpired = await isJwtExpired(refreshToken);
          } catch (e) {
            console.log('token is invalid', e);
          }
        }

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.

        if (isAccessTokenExpired) {
            if(isRefreshTokenExpired) {
                this.context.setIsAuthenticated(false);
                this.context.setAccessToken(null);
                this.context.setRefreshToken(null);
            } else {
                const refreshResult = await api.post('/refresh', JSON.stringify({ refresh_token: refreshToken }))
                .catch(function() {
                    AsyncStorage.removeItem('accessToken');
                    AsyncStorage.removeItem('refreshToken');
                    return NavigationService.navigate('Auth');
                });
                const data = refreshResult != undefined && refreshResult.data != undefined ? refreshResult.data : undefined;
                if(data != undefined && data.hasOwnProperty('accessToken')) {
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
                    this.context.setIsAuthenticated(true);
                    this.context.setAccessToken(data.accessToken);
                    this.context.setRefreshToken(data.refreshToken);
                    NavigationService.navigate('App');
                } else {
                    this.context.setIsAuthenticated(false);
                    this.context.setAccessToken(null);
                    this.context.setRefreshToken(null);
                }
            }
            return NavigationService.navigate('Auth');
        }

        NavigationService.navigate('App');

    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
