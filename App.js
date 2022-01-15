import React, { useState } from 'react';
import { LogBox } from 'react-native';
import Routes from '~/routes';
import { AuthenticationContext } from '~/context/authentication.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs([
  'Unrecognized WebSocket',
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
  'Expected style'
]);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated, accessToken, setAccessToken, refreshToken, setRefreshToken }}>
        <Routes />
      </AuthenticationContext.Provider>
    </GestureHandlerRootView>
  );
}
