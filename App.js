import React, { useState } from 'react';
import { LogBox } from 'react-native';
import Routes from '~/routes';
import { AuthenticationContext } from '~/context/authentication.context';
import { PlayerContext } from '~/context/player.context';
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
  const [currentMediaPlaylistId, setCurrentMediaPlaylistId] = useState(-1);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const setCurrentPlaylistAndMedia = (playlist, startMediaId = 0) => {
    setCurrentPlaylist(playlist);
    setCurrentMediaPlaylistId(startMediaId);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated, accessToken, setAccessToken, refreshToken, setRefreshToken }}>
        <PlayerContext.Provider value={{ currentMediaPlaylistId, setCurrentMediaPlaylistId, currentPlaylist, setCurrentPlaylist: setCurrentPlaylistAndMedia }}>
          <Routes />
        </PlayerContext.Provider>
      </AuthenticationContext.Provider>
    </GestureHandlerRootView>
  );
}
