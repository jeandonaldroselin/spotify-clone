import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import Routes from '~/routes';
import { AuthenticationContext } from '~/context/authentication.context';
import { PlayerContext } from '~/context/player.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationService from '~/services/NavigationService';

LogBox.ignoreLogs([
  'Unrecognized WebSocket',
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
  'Expected style',
  'Please update the following compone'
]);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  //Player
  const [currentMediaPlaylistId, setCurrentMediaPlaylistId] = useState(-1);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(undefined);

  // useEffect(async () => {
  //   if (sound !== undefined) {
  //     alert('stop')
  //   }
  //   alert('start')
  // }, [currentPlaylist, currentMediaPlaylistId])

  const setCurrentPlaylistAndMedia = (playlist, startMediaId = 0) => {
    setCurrentPlaylist(playlist);
    setCurrentMediaPlaylistId(startMediaId);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated, accessToken, setAccessToken, refreshToken, setRefreshToken }}>
        <PlayerContext.Provider value={{
          currentMediaPlaylistId,
          setCurrentMediaPlaylistId,
          currentPlaylist,
          setCurrentPlaylist: setCurrentPlaylistAndMedia,
          isPlaying,
          setIsPlaying,
          sound,
          setSound
        }}>
          <Routes 
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}/>
        </PlayerContext.Provider>
      </AuthenticationContext.Provider>
    </GestureHandlerRootView>
  );
}
