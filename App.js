import React, { useState } from 'react';
import { YellowBox } from 'react-native';
import Routes from '~/routes';
import { AuthenticationContext } from '~/context/authentication.context';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Routes />
    </AuthenticationContext.Provider>
  );
}
