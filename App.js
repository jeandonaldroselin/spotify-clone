import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import Routes from '~/routes';
import { Audio } from 'expo-av';
import { AuthenticationContext } from '~/context/authentication.context';
import { PlayerContext } from '~/context/player.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationService from '~/services/NavigationService';
import api from '~/services/api';

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
  const [isLaunching, setIsLaunching] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [percent, setPercent] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [togglePlayPause, setTogglePlayPause] = useState(false);
  const [toggleForwardBackward, setToggleForwardBackward] = useState(false);


  useEffect(() => {
    if (currentPlaylist) {
      startOrStopAudio(false);
    }
  }, [currentPlaylist])

  useEffect(() => {
    if (currentPlaylist) {
      startOrStopAudio(false);
    }
  }, [toggleForwardBackward]) // handle the foward and backward 



  const startOrStopAudio = async (checkSpamming) => {
    if (sound !== undefined) {
      await onStopPress(checkSpamming);
    }
    await onStartPress(checkSpamming);
  }

  const changeTime = async (_percent, checkSpamming = true) => {
    if (checkSpamming) {
      if (isSpamming()) {
        return;
      }
      preventSpam(200);
    }
    if (!sound) {
      return false;
    }
    const seektime = (_percent / 100) * duration;
    await sound.sound.setPositionAsync(seektime)
  };

  const setCurrentPlaylistAndMedia = async (playlist, startMediaId = 0, checkSpamming = true) => {
    if (checkSpamming) {
      if (isSpamming()) {
        return;
      }
      preventSpam(1500);
    }
    const { data } = await api.get('/media/log/' + playlist.items[startMediaId].id);
    setCurrentMediaPlaylistId(startMediaId);
    setCurrentPlaylist({ ...playlist });
  }

  const _onPlaybackStatusUpdate = (status) => {
    if (!status?.positionMillis || !status?.durationMillis) {
      return;
    }

    if (status.positionMillis === status.durationMillis) {
      sound?.sound.stopAsync();
    }
    let percent = Math.floor(
      (status.positionMillis / status.durationMillis) * 100,
    );

    setPercent(percent);
    setTimeElapsed(status.positionMillis);
    setDuration(status.durationMillis);
  };

  const onStartPress = async (checkSpamming) => {
    if (checkSpamming) {
      if (isSpamming()) {
        return new Promise((resolve) => {
          resolve(true);
        });
      }
      preventSpam(1500);
    }
    setIsPlaying(true);
    setInProgress(true);
    const path = currentPlaylist.items[currentMediaPlaylistId].playUrl;
    try {
      if (sound?.sound) {
        const status = await sound.sound.getStatusAsync();
        if (path.includes(status.uri)) { // Here we know the sound is just paused
          await sound.sound.playAsync();
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false
      });

      if (sound?.sound) {
        await sound.sound.unloadAsync();
      }
      const localSound = await Audio.Sound.createAsync({ uri: path });

      localSound.sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      setSound(localSound);

      await Promise.all([localSound.sound.playAsync(), localSound.sound.setVolumeAsync(1.0)]);
    }
    catch (e) {
      console.error(e)
    }
  };

  const onPausePress = (checkSpamming) => {
    if (checkSpamming) {
      if (isSpamming()) {
        return new Promise((resolve) => {
          resolve(true);
        })
      }
      preventSpam(1500);
    }
    setIsPlaying(false);
    return sound.sound.pauseAsync();
  };

  const isSpamming = () => {
    return isLaunching;
  }

  const preventSpam = (delay) => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
    }, delay);
  }

  const onStopPress = (checkSpamming) => {
    setIsPlaying(false);
    return sound.sound.stopAsync();
  };

  const onForward = async () => {
    if (isSpamming()) {
      return;
    }
    preventSpam(1500);
    if (currentMediaPlaylistId >= currentPlaylist.items?.length - 1) {
      return;
    }

    let current_index = currentMediaPlaylistId + 1;
    if (current_index === currentPlaylist.items?.length) {
      setCurrentMediaPlaylistId(0);
    } else {
      setCurrentMediaPlaylistId(current_index);
    }
    setToggleForwardBackward(!toggleForwardBackward);
  };

  const onBackward = async () => {
    if (isSpamming()) {
      return;
    }
    preventSpam(1500);
    if (currentMediaPlaylistId === 0) {
      return;
    }

    let current_index = currentMediaPlaylistId;
    if (current_index === 0) {
      setCurrentMediaPlaylistId(currentPlaylist.items?.length - 1);
    } else {
      setCurrentMediaPlaylistId(current_index - 1);
    }
    setToggleForwardBackward(!toggleForwardBackward);
  };

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
          setSound,
          onStartPress,
          onPausePress,
          onBackward,
          onForward,
          changeTime,
          duration,
          timeElapsed,
          percent,
          inProgress
        }}>
          <Routes
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }} />
        </PlayerContext.Provider>
      </AuthenticationContext.Provider>
    </GestureHandlerRootView>
  );
}
