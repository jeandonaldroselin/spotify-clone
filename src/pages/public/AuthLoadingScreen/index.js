
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import { isJwtExpired } from 'jwt-check-expiration';
import SkeletonContent from 'react-native-skeleton-content';

export default class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        this._bootstrapAsync(useContext(AuthenticationContext));
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async (authenticationContext) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const isAccessTokenExpired = isJwtExpired(accessToken);

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if (isAccessTokenExpired) {
            authenticationContext.setIsAuthenticated(false);
            authenticationContext.setAccessToken(null);
            authenticationContext.setRefreshToken(null);            
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