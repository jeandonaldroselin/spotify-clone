
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
import SkeletonContent from 'react-native-skeleton-content';

export default class AuthLoadingScreen extends React.Component {

    static contextType = AuthenticationContext;

    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async (/*authenticationContext*/) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        let isAccessTokenExpired = true;
        if(accessToken) {
          try {
            isAccessTokenExpired = await isJwtExpired(accessToken);
          } catch (e) {
            console.log('token is invalid', e);
          }
        }

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.

        console.log('this.context', this.context);

        if (isAccessTokenExpired) {
            this.context.setIsAuthenticated(false);
            this.context.setAccessToken(null);
            this.context.setRefreshToken(null);
            return this.props.navigation.navigate('Auth');
        }

        this.props.navigation.navigate('App');

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
